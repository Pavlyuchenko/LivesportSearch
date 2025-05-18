// src/__tests__/example.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";

// A simple component to test
const TestComponent = () => <div>Hello Testing World</div>;

test("renders test component", () => {
    render(<TestComponent />);
    expect(screen.getByText(/hello testing world/i)).toBeInTheDocument();
});
