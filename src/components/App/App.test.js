import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom"

it("should display heading", () => {
    render(<App />)
    const heading = screen.getByTestId('main_heading');
    expect(heading).toBeInTheDocument();
});

// it('should update search results on successful search', async () => {
//     const mockSearchTracks = jest.fn().mockResolvedValueOnce([
//       { id: 1, title: 'Track 1' },
//       { id: 2, title: 'Track 2' },
//     ]);
//     render(<App searchTracks={mockSearchTracks} />);
  
//     const searchButton = screen.getByTestId(/searchButton/i);
//     fireEvent.click(searchButton);
  
//     await waitFor(() => expect(screen.getByText(/Track 1/i)).toBeInTheDocument());
//     await waitFor(() => expect(screen.getByText(/Track 2/i)).toBeInTheDocument());
// });
  