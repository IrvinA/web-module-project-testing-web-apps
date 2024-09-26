import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
   render(<ContactForm />); 
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const formHeader = screen.queryByText(/contact form/i);
    expect(formHeader).toHaveTextContent(/contact form/i);
    expect(formHeader).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'Drew');
    await waitFor(() => {
        const firstNameValidation = screen.queryByTestId('error');
        expect(firstNameValidation).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const formValidation = screen.queryAllByTestId('error');
    expect(formValidation).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.queryByLabelText('First Name*');
    const lastNameInput = screen.queryByLabelText('Last Name*');
    const button = screen.getByRole('button');
    userEvent.type(firstNameInput, 'Irvin');
    userEvent.type(lastNameInput, 'Arevalos');
    userEvent.click(button);
    await waitFor(() => {
        const emailValidation = screen.queryByTestId('error');
        expect(emailValidation).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.queryByLabelText('Email*');
    userEvent.type(emailInput, 'fakeemail.com');
    await waitFor(() => {
        const emailValidation = screen.queryByTestId('error');
        expect(emailValidation).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.queryByLabelText('First Name*');
    const emailInput = screen.queryByLabelText('Email*');
    const button = screen.getByRole('button');
    userEvent.type(firstNameInput, 'Irvin');
    userEvent.type(emailInput, 'testemail@email.com');
    userEvent.click(button);
    await waitFor(() => {
        const lastNameValidation = screen.queryByTestId('error');
        expect(lastNameValidation).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.queryByLabelText('First Name*');
    const lastNameInput = screen.queryByLabelText('Last Name*');
    const emailInput = screen.queryByLabelText('Email*');
    const button = screen.getByRole('button');
    userEvent.type(firstNameInput, 'Irvin');
    userEvent.type(lastNameInput, 'Arevalos');
    userEvent.type(emailInput, 'testemail@email.com');
    userEvent.click(button);
    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId('firstnameDisplay');
        const lastnameDisplay = screen.queryByTestId('lastnameDisplay');
        const emailDisplay = screen.queryByTestId('emailDisplay');
        const messageDisplay = screen.queryByTestId('messageDisplay');
        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.queryByLabelText('First Name*');
    const lastNameInput = screen.queryByLabelText('Last Name*');
    const emailInput = screen.queryByLabelText('Email*');
    const messageInput = screen.queryByLabelText(/message/i);
    const button = screen.getByRole('button');
    userEvent.type(firstNameInput, 'Irvin');
    userEvent.type(lastNameInput, 'Arevalos');
    userEvent.type(emailInput, 'testemail@email.com');
    userEvent.type(messageInput, 'This is just a test message');
    userEvent.click(button);
    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId('firstnameDisplay');
        const lastnameDisplay = screen.queryByTestId('lastnameDisplay');
        const emailDisplay = screen.queryByTestId('emailDisplay');
        const messageDisplay = screen.queryByTestId('messageDisplay');
        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});