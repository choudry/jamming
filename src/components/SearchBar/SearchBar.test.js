import { SearchBar } from './SearchBar.jsx'
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom"

it('should render the search input with placeholder text', () => {
    const { getByRole, getByPlaceholderText } = render(<SearchBar setSearchTerm={() => {}} />);
  
    const searchInput = getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  
    expect(getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

it ("should update the set search term state with input change", () => {
    const mockSetSearchTerm = jest.fn();
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);

    const searchInput = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(searchInput, { target: { value: 'test'}});

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
});

it ("show the text input in search input", () => {
    const mockSetSearchTerm = jest.fn();
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'Hello World!')

    expect(searchInput.value).toBe('Hello World!');
});