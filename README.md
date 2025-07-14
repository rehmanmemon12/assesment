Overview
The Appointment Dashboard UI is a responsive frontend application built using Angular, Angular Material, and Tailwind CSS. It replicates a patient management interface with a focus on clean UI, reusable components, and static data simulation.

It includes two primary views:

A dashboard for managing patient appointments.

A form for registering or editing a patient's visit.

This project was completed as part of a frontend assessment challenge and showcases attention to design fidelity, responsiveness, and modular structure.

✨ Features
Dashboard Overview
View upcoming and past appointments with sortable, filterable tables.

Header & Subheader Layout
Reusable header and subheader components for consistent layout across screens.

Appointment Model (Static Data)
Structured static JSON data simulating appointments with fields like date, time, patient name, and doctor.

Visit Form
A reactive form to register or edit visit details with proper validations and material inputs.

Reusable Components
Created modular Angular components like AppointmentCard, VisitForm, and Header.

Responsive Design
Optimized for all screen sizes using Tailwind's utility classes and Angular Material grid layout.

Styling Consistency
Ensured consistent spacing, fonts, and component alignment with Figma reference using Tailwind CSS.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
