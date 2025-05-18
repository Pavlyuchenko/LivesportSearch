// src/__tests__/SearchInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@assets/search-icon.svg", () => "search-icon-mock");
jest.mock("@assets/cancel.svg", () => "cancel-icon-mock");

import SearchInput from "../../components/SearchInput";

describe("SearchInput Component", () => {
    const mockDebounceSearch = jest.fn();
    const mockSetSearchTerm = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with empty search term", () => {
        render(
            <SearchInput
                debounceSearch={mockDebounceSearch}
                searchTerm=""
                setSearchTerm={mockSetSearchTerm}
            />
        );

        const inputElement = screen.getByPlaceholderText(/search\.\.\./i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("");
    });

    test("calls debounceSearch and setSearchTerm when input changes", () => {
        render(
            <SearchInput
                debounceSearch={mockDebounceSearch}
                searchTerm=""
                setSearchTerm={mockSetSearchTerm}
            />
        );

        const inputElement = screen.getByPlaceholderText(/search\.\.\./i);
        fireEvent.change(inputElement, { target: { value: "test query" } });

        expect(mockSetSearchTerm).toHaveBeenCalledWith("test query");
        expect(mockDebounceSearch).toHaveBeenCalledWith("test query");
    });
});
