# Frontend Project

This project is a frontend application built with React, TypeScript, and Vite. It uses various hooks, services,
contexts, and components to manage state, fetch data, and render the UI. The project also integrates Material-UI (MUI)
for styling and SCSS for custom styles.

## Project Structure

- **src**
    - **components**: Contains all the React components used in the project.
    - **context**: Contains context providers for managing global state.
    - **hooks**: Contains custom hooks for data fetching and state management.
    - **model**: Contains TypeScript types and interfaces.
    - **services**: Contains functions for making API calls.
    - **App.tsx**: The main application component.
    - **index.tsx**: The entry point of the application.

## How to Run the Project

1. **Install Dependencies**: Run `npm install` to install all the required dependencies.
2. **Start Development Server**: Run `npm run dev` to start the development server.
3. **Build for Production**: Run `npm run build` to build the project for production.
4. **Preview Production Build**: Run `npm run preview` to preview the production build.

## Services

- **backend.ts**: Contains functions for making API calls to the backend using `axios`.
    - `getTrucksOnTime()`: Fetches trucks on time data.
    - `getTruckOnTime(licensePlate: string)`: Fetches details of a specific truck.
    - `getTrucksOnSite()`: Fetches trucks on site data.
    - `getPurchaseOrders()`: Fetches purchase orders data.
    - `getPurchaseOrder(poNumber: string)`: Fetches details of a specific purchase order.
    - `getWarehouses()`: Fetches warehouses data.
    - `getWarehouse(warehouseId: string)`: Fetches details of a specific warehouse.
    - `makeAppointment(appointment: Appointment)`: Schedules an appointment.

## Hooks

- **useTrucksOnTime.ts**: Custom hook for fetching trucks on time data.
- **useTrucksOnSite.ts**: Custom hook for fetching trucks on site data.
- **usePurchaseOrders.ts**: Custom hook for fetching purchase orders data.
- **useWarehouses.ts**: Custom hook for fetching warehouses data.
- **useAddAppointment.ts**: Custom hook for adding appointments.

## Contexts

- **SecurityContext.ts**: Provides authentication state and functions.
- **SecurityContextProvider.tsx**: Context provider for managing authentication state.

## Components

- **Dashboard.tsx**
    - **Purpose**: Displays an overview of trucks, purchase orders, and warehouses.
    - **Methods**:
        - `useDashboardData()`: Fetches data for trucks on time, trucks on site, purchase orders, and warehouses.
        - `useEffect()`: Handles loading and error states.

- **TruckTable.tsx**
    - **Purpose**: Displays a table of trucks on time.
    - **Methods**:
        - `useTrucksOnTime()`: Fetches trucks on time data.
        - `useState()`: Manages local state for selected date, total trucks, and on-time trucks.
        - `useEffect()`: Updates truck counts based on selected date and fetched data.

- **TruckDetails.tsx**
    - **Purpose**: Displays details of a specific truck.
    - **Methods**:
        - `useTruckOnTime()`: Fetches details of a specific truck based on its license plate.
        - `useParams()`: Retrieves the truck's license plate from the URL.

- **TruckOnSiteCounter.tsx**
    - **Purpose**: Displays the count of trucks on site.
    - **Methods**:
        - `useTrucksOnSite()`: Fetches trucks on site data.
        - `useState()`: Manages local state for total trucks.
        - `useEffect()`: Updates the total truck count based on fetched data.

- **WarehouseList.tsx**
    - **Purpose**: Displays a list of warehouses.
    - **Methods**:
        - `useWarehouses()`: Fetches warehouses data.
        - `useState()`: Manages local state for selected seller.
        - `useEffect()`: Handles loading and error states.

- **WarehouseDetails.tsx**
    - **Purpose**: Displays details of a specific warehouse.
    - **Methods**:
        - `useWarehouse()`: Fetches details of a specific warehouse based on its ID.
        - `useParams()`: Retrieves the warehouse ID from the URL.

- **PurchaseOrderList.tsx**
    - **Purpose**: Displays a list of purchase orders.
    - **Methods**:
        - `usePurchaseOrders()`: Fetches purchase orders data.
        - `useState()`: Manages local state for selected status.
        - `useEffect()`: Handles loading and error states.

- **PurchaseOrderDetails.tsx**
    - **Purpose**: Displays details of a specific purchase order.
    - **Methods**:
        - `usePurchaseOrder()`: Fetches details of a specific purchase order based on its number.
        - `useParams()`: Retrieves the purchase order number from the URL.

- **AppointmentForm.tsx**
    - **Purpose**: Form for scheduling appointments.
    - **Methods**:
        - `useAddAppointment()`: Handles the mutation for adding an appointment.
        - `useState()`: Manages local state for appointment data.
        - `handleChange()`: Updates state based on form input changes.
        - `handleSubmit()`: Submits the form to schedule an appointment.

- **RouteGuard.tsx**
    - **Purpose**: Protects routes that require authentication.
    - **Methods**:
        - `useContext()`: Accesses the security context to check authentication status.
        - `isAuthenticated()`: Checks if the user is authenticated.
        - `login()`: Redirects to the login page if the user is not authenticated.

- **Header.tsx**
    - **Purpose**: Displays the header with user information and logout button.
    - **Methods**:
        - `useContext()`: Accesses the security context to get user information and logout function.
        - `logout()`: Logs out the user.

## Styling

- **MUI**: Used for component styling and theming.
- **SCSS**: Used for custom styles.

## State Management and Re-rendering

- **useState**: Used for managing local state within components.
- **useEffect**: Used for side effects like data fetching and updating state based on dependencies.
- **React Query**: Used for data fetching, caching, and synchronization.

## Security

### Keycloak Integration

This project uses Keycloak for authentication and authorization. Keycloak is an open-source Identity and Access
Management (IAM) solution.

#### Keycloak Configuration

The Keycloak configuration is defined in the `SecurityContextProvider.tsx` file:

```typescript
const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
};
const keycloak: Keycloak = new Keycloak(keycloakConfig);
```

##### Security Context Provider

The SecurityContextProvider component initializes Keycloak and manages the authentication state. It provides the
following functions:

- **login()**: Redirects the user to the Keycloak login page.
- **logout()**: Logs out the user and redirects to the Keycloak logout page.
- **isAuthenticated()**: Checks if the user is authenticated.

The provider also sets up event handlers for Keycloak events such as authentication success, logout, error, and token
expiration.

##### Adding Access Token to Axios Requests

The access token is added to the axios headers for authenticated API requests:

```typescript
export function addAccessTokenToAuthHeader(token: string | undefined) {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else {
        removeAccessTokenFromAuthHeader();
    }
}

export function removeAccessTokenFromAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
}
```

##### Route Guard

The RouteGuard component protects routes that require authentication. It checks if the user is authenticated and either
renders the protected component or redirects to the login page.

## Plugins and Dependencies

- **@emotion/styled**
- **@mui/material**
- **@mui/x-date-pickers**
- **@react-keycloak/web**
- **@tanstack/react-query**
- **axios**
- **dayjs**
- **keycloak-js**
- **react**
- **react-dom**
- **react-jwt**
- **react-router-dom**
- **@eslint/js**
- **@types/react**
- **@types/react-dom**
- **@vitejs/plugin-react**
- **eslint**
- **eslint-plugin-react-hooks**
- **eslint-plugin-react-refresh**
- **globals**
- **sass-embedded**
- **typescript**
- **typescript-eslint**
- **vite**

## Environment Variables

- **.env.development**: Contains environment variables for development.
    - `VITE_BACKEND_URL`
    - `VITE_KC_URL`
    - `VITE_KC_REALM`
    - `VITE_KC_CLIENT_ID`

## Axios

`axios` is a promise-based HTTP client for the browser and Node.js. It is used to make HTTP requests to the backend API.
It supports features like interceptors, request and response transformation, and automatic JSON data transformation.

## Pictures of the pages

In the Pages folder you can find pictures of the pages of the application.

## Conclusion

This project demonstrates a comprehensive setup for a React application with TypeScript, Vite, MUI, SCSS, and various
hooks and contexts for state management and data fetching. It also includes authentication using Keycloak and follows
best practices for code organization and styling.