// src/__tests__/SearchInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

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

const typeIds = {
    ALL: [1, 2, 3, 4],
    COMPETITIONS: [1],
    TEAMS: [2, 3, 4],
};

jest.mock("@utils/constants", () => ({
    TYPE_IDS_MAP: {
        ALL: {
            text: "All",
            value: typeIds.ALL,
        },
        COMPETITIONS: {
            text: "Competitions",
            value: typeIds.COMPETITIONS,
        },
        TEAMS: {
            text: "Teams",
            value: typeIds.TEAMS,
        },
    },
}));

import Filters from "../../components/Filters";

describe("Filters Component", () => {
    const mockSetTypeIds = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("changes typeIDs on click", () => {
        const { container } = render(
            <Filters typeIds={typeIds.ALL} setTypeIds={mockSetTypeIds} />
        );

        const allElement = screen.getByText(/All/i);
        const competitionsElement = screen.getByText(/Competitions/i);
        const teamsElement = screen.getByText(/Teams/i);

        expect(allElement).toBeInTheDocument();
        expect(competitionsElement).toBeInTheDocument();
        expect(teamsElement).toBeInTheDocument();

        expect(allElement).toHaveClass("filter-button filter-button-active");

        fireEvent.click(allElement);

        expect(mockSetTypeIds).toHaveBeenCalledWith(typeIds.ALL);
        expect(allElement).toHaveClass("filter-button filter-button-active");

        fireEvent.click(competitionsElement);

        expect(mockSetTypeIds).toHaveBeenCalledWith(typeIds.COMPETITIONS);
    });
});
