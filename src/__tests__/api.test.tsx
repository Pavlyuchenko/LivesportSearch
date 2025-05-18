// src/__tests__/SearchComponent.test.tsx
import React from "react";
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SearchComponent from "../app/routes/SearchComponent";

// Mock SVG imports
jest.mock("@assets/search-icon.svg", () => "search-icon-mock");
jest.mock("@assets/cancel.svg", () => "cancel-icon-mock");
jest.mock("@assets/arrow.svg", () => "arrow-icon-mock");
jest.mock("@assets/no_results.svg", () => "no-results-mock");
jest.mock("@assets/qm.svg", () => "qm-icon-mock");
jest.mock("@assets/americky_fotbal.svg", () => "americky-fotbal-mock");
jest.mock("@assets/basebal.svg", () => "basebal-mock");
jest.mock("@assets/basketbal.svg", () => "basketbal-mock");
jest.mock("@assets/fotbal.svg", () => "fotbal-mock");
jest.mock("@assets/hokej.svg", () => "hokej-mock");
jest.mock("@assets/rugby.svg", () => "rugby-mock");
jest.mock("@assets/tenis.svg", () => "tenis-mock");
jest.mock("@assets/hazena.svg", () => "hazena-mock");

// Mock fetch
global.fetch = jest.fn();

describe("SearchComponent", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("verifies search flow and async data loading", async () => {
        // Mock successful API response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: "123",
                    name: "Arsenal FC",
                    type: { id: 2, name: "Team" },
                    sport: { id: 1, name: "Soccer" },
                    images: [
                        { path: "image.png", usageId: 3, variantTypeId: 15 },
                    ],
                    defaultCountry: { id: 1, name: "England" },
                    gender: { id: 1, name: "Men" },
                    participantTypes: [],
                    url: "arsenal",
                    favouriteKey: { web: "", portable: "" },
                    flagId: null,
                    teams: [],
                    defaultTournament: null,
                    superTemplate: null,
                },
            ],
        });

        render(
            <BrowserRouter>
                <SearchComponent />
            </BrowserRouter>
        );

        expect(
            screen.getByText(/Enter at least 2 characters/i)
        ).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText(/search\.\.\./i);
        fireEvent.change(searchInput, { target: { value: "arsenal" } });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        // wait for result to show up in the component
        await waitFor(() => {
            expect(screen.getByText("Soccer")).toBeInTheDocument();
            expect(screen.getByText("Arsenal FC")).toBeInTheDocument();
        });

        // Test for no results
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        fireEvent.change(searchInput, { target: { value: "no-results" } });

        await waitFor(() => {
            expect(screen.getByText(/No results found/i)).toBeInTheDocument();
        });
    });

    test("check debounce functionality", async () => {
        jest.useFakeTimers();

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(
            <BrowserRouter>
                <SearchComponent />
            </BrowserRouter>
        );

        await act(async () => {
            const searchInput = screen.getByPlaceholderText(/search\.\.\./i);

            fireEvent.change(searchInput, { target: { value: "a" } });
            // it should not call fetch yet, only after some time
            expect(global.fetch).not.toHaveBeenCalled();

            fireEvent.change(searchInput, { target: { value: "arsenal" } });

            // Fast-forward time
            jest.advanceTimersByTime(500);
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });
});
