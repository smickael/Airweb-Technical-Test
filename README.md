# Airweb Technical Test

The goal of this project is to develop the UI of a simple shop, including:

- a _catalog page_ with some features:
  - Filter by category
  - Filter by price range
  - Search bar
- a _cart page_ where you can:
  - Modify the quantity of an item
  - Remove an item
  - Simulate the payment

The API has two endpoints, a list of **products** and a list of **categories**.

```
interface Product {
 id: string; // Product id
 label: string; // Product title
 description: string; // Product description
 price: number; // Price (in cents)
 category_id: string; // Category id
 thumbnail_url: string | null; // Image URL
}
```

```
interface Category {
 id: string; // Unique product identifier
 index: number; // Category id
 label: string; // Category name
 description: string; // Category description
}
```

## Installation & Running

After cloning the repository on your desktop, open the project on your code editor. Open the terminal and enter the following command to install all the packages needed to run the shop.

```
 npm i
```

Once the installation is done, enter this command to run the project.

```
npm run dev
```

## General features

- Toggle **Dark/Light mode**

- Toggle **English/French language**

## Upcoming features

- **Alerts** (or **Toast** or also **Notifications**) to show a more convincing confirmation of adding/removing an article, processing an order.

- **Storybook**: a workshop for building UI components and pages in isolation

- **Enhance** loading data timing

- **Insensitive case** searching
