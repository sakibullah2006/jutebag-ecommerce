![GitHub license](https://img.shields.io/github/license/sakibullah2006/jutebag-ecommerce)
![GitHub issues](https://img.shields.io/github/issues/sakibullah2006/jutebag-ecommerce)
![GitHub stars](https://img.shields.io/github/stars/sakibullah2006/jutebag-ecommerce)

# JuteBag Ecommerce 🌱

JuteBag Ecommerce is an eco-friendly, sustainable e-commerce platform dedicated to promoting environmentally conscious shopping through natural fiber bags. Built with [Next.js](https://nextjs.org/) and integrated with [WooCommerce](https://woocommerce.com/), our platform specializes in **jute bags, cotton bags, and other sustainable fabric bags** that help reduce plastic waste and support a greener planet.

**🌍 Mission**: To provide sustainable, biodegradable bag alternatives that replace harmful plastic bags while supporting eco-conscious consumers and businesses in their journey toward environmental responsibility.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- 🌱 **Eco-Friendly Focus**: Specialized in sustainable jute bags, cotton bags, and natural fabric alternatives
- 🌍 **Environmental Impact**: Each purchase helps reduce plastic waste and supports biodegradable solutions
- ♻️ **Sustainable Materials**: Premium quality bags made from renewable, biodegradable natural fibers
- 🎋 **Jute Specialization**: Wide range of jute bags - from shopping totes to promotional bags
- 🌿 **Cotton Collection**: Organic cotton bags for various uses - grocery, retail, and custom branding
- ⚡ **Performance Optimized**: Built with Next.js 15.3+ and Turbopack for lightning-fast development
- 🛒 **WooCommerce Integration**: Seamless integration with WooCommerce REST API
- 💳 **Stripe Payments**: Complete payment processing with Stripe integration
- 🎨 **Earth-Friendly Design**: Beautiful, responsive design inspired by nature with Tailwind CSS
- 📱 **Mobile-First**: Fully responsive design optimized for all devices
- 🔐 **Authentication**: User registration, login, and account management, OTP-Based Password Reset
- 🛍️ **Green Shopping Features**: Cart, wishlist, compare eco-products, and sustainable checkout
- 📊 **Customer Dashboard**: Track your environmental impact and order history
- 🔍 **Eco-Product Search**: Advanced search and filtering for sustainable bag options
- 🌙 **Dark Mode**: Energy-efficient dark theme support with next-themes
- ♿ **Accessibility**: Built with accessibility best practices for inclusive shopping

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [pnpm](https://pnpm.io/) (preferred package manager)
- A running [WooCommerce](https://woocommerce.com/) instance with REST API enabled

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sakibullah2006/jutebag-ecommerce.git
   cd jutebag-ecommerce
   git checkout webhook-revalidation
   ```

2. **Install dependencies**:

   Using pnpm (recommended):

   ```bash
   pnpm install
   ```

   Or using npm:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add your configuration:

   ```env
   # WordPress/WooCommerce Configuration
   WORDPRESS_SITE_URL=https://your-wordpress-site.com
   WC_CONSUMER_KEY=ck_your_consumer_key_here
   WC_CONSUMER_SECRET=cs_your_consumer_secret_here
   WC_WEBHOOK_SECRET=your_generated_webhook_secret
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publisher_key

   # Website env
   NEXT_PUBLIC_BASE_URL=server_base_url

   # Settings env
   NODE_ENV="development" || "prod"
   ```

4. **Start the development server**:

   Using pnpm:

   ```bash
   pnpm dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

5. **Access the store**:

   Open your browser and visit `http://localhost:3000` to see the store in action.

**Platform Notes**: These instructions work across Windows, macOS, and Linux, as Next.js is platform-agnostic.

---

## Configuration

### Environment Variables

The project uses environment variables for configuration. Here are the required variables:

#### WordPress/WooCommerce API
- `WORDPRESS_SITE_URL`: Your WordPress site URL (e.g., `https://yourstore.com`)
- `WC_CONSUMER_KEY`: Your WooCommerce API consumer key
- `WC_CONSUMER_SECRET`: Your WooCommerce API consumer secret
- `WC_WEBHOOK_SECRET`: Your generated WooCommerce webhook secret

#### Stripe Payment Processing
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

### WooCommerce Setup

1. **Enable REST API**: In your WooCommerce admin, go to WooCommerce > Settings > Advanced > REST API
2. **Create API Keys**: Generate consumer key and secret with read/write permissions
3. **Configure Permalinks**: Ensure WordPress permalinks are set to "Post name" or custom structure
4. **Enable WebHook for fast caching**: In your WooCommerce admin, go to WooCommerce > Settings > Advanced > Webhook

### Stripe Webhook Configuration

For detailed Stripe webhook setup instructions, Read [Stripe Docs](https://docs.stripe.com/get-started)

---

## Usage

Once the server is running, access your eco-friendly bag store at `http://localhost:3000`. Key sustainable shopping features include:

- **Homepage**: Featured eco-friendly bags, sustainable categories, and environmental impact highlights
- **Shop**: Browse jute bags, cotton bags, and fabric alternatives with eco-filters and sorting
- **Product Pages**: Detailed information about bag materials, sustainability benefits, and environmental impact
- **Eco-Cart**: Add sustainable products, apply green coupons, and calculate your environmental savings
- **Green Checkout**: Carbon-neutral payment processing with environmental impact tracking
- **User Account**: Registration, login, order history, and your personal sustainability metrics
- **Eco-Dashboard**: Track your environmental contribution, plastic bags saved, and carbon footprint reduction

### Sustainable Product Categories

- **Jute Bags**: Durable, biodegradable shopping bags, promotional totes, and custom branded options
- **Cotton Bags**: Organic cotton shopping bags, reusable grocery totes, and eco-friendly retail bags
- **Canvas Bags**: Heavy-duty canvas totes for long-term use and bulk shopping
- **Hemp Bags**: Ultra-sustainable hemp fiber bags for eco-conscious consumers
- **Customizable Options**: Personalized eco-bags for businesses promoting sustainability

### Example Routes

- `/` - Homepage with sustainability mission
- `/shop` - Eco-friendly bag catalog with green filters
- `/shop/jute-bags` - Dedicated jute bag collection
- `/shop/cotton-bags` - Organic cotton bag selection
- `/product/[id]` - Individual eco-product pages with sustainability info
- `/cart` - Green shopping cart with environmental impact calculator
- `/checkout` - Eco-conscious checkout process
- `/dashboard` - Customer dashboard with sustainability metrics
- `/about-sustainability` - Learn about our environmental mission
- `/environmental-impact` - Track collective customer impact

---

## Project Structure

```
jutebag-ecommerce/
├── actions/                    # Server actions for data fetching
│   ├── auth-actions.ts         # Authentication actions
│   ├── products-actions.ts     # Eco-product related actions
│   ├── order-actions.ts        # Sustainable order management
│   ├── sustainability-actions.ts # Environmental impact tracking
│   └── ...
├── app/                        # Next.js app router pages
│   ├── shop/                   # Eco-product browsing
│   ├── cart/                   # Green shopping cart
│   ├── checkout/               # Sustainable checkout process
│   ├── dashboard/              # Customer eco-dashboard
│   ├── product/[id]/           # Dynamic eco-product pages
│   ├── sustainability/         # Environmental impact pages
│   └── ...
├── components/                 # Reusable React components
│   ├── Home/                   # Eco-cart components
│   ├── Cart/                   # Eco-cart components
│   ├── Header/                 # Green header components
│   ├── Product/                # Sustainable product components
│   ├── Sustainability/         # Environmental impact widgets
│   └── ...
├── context/                    # React context providers
├── lib/                        # Utility functions and configurations
├── styles/                     # Earth-inspired SCSS stylesheets
├── types/                      # TypeScript type definitions
└── public/                     # Static assets (eco-friendly imagery)
└── constant/                   # Sustainability data and eco-metrics
```

---

## Development

### Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Technology Stack

- **Framework**: Next.js 15.3+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Earth-inspired Custom SCSS
- **UI Components**: Eco-friendly custom components with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + Server Components
- **Payment**: Stripe (supporting carbon-neutral transactions)
- **E-commerce**: WooCommerce REST API (optimized for sustainable products)
- **Package Manager**: pnpm
- **Sustainability**: Custom environmental impact tracking and metrics

### Green Styling Philosophy

The project uses nature-inspired design with:
- **Tailwind CSS**: Utility-first CSS framework with earth-tone color palette
- **Custom SCSS**: Eco-themed modular stylesheets in the `styles/` directory  
- **CSS Variables**: Natural color schemes and sustainable design patterns
- **Accessibility**: Inclusive design ensuring everyone can access sustainable shopping

---

## Contributing

We welcome contributions to JuteBag Ecommerce and our mission of promoting sustainable shopping! Here's how to get involved:

1. **Set up the development environment**:
   Follow the [Installation](#installation) steps above.

2. **Coding Standards**:
   - Use TypeScript for all new code
   - Follow sustainable development practices and patterns
   - Write descriptive commit messages with environmental impact in mind
   - Ensure ESLint passes: `pnpm lint`
   - Consider performance implications for eco-conscious hosting

3. **Submitting Pull Requests**:
   - Fork the repository
   - Create a feature branch: `git checkout -b feature/eco-friendly-feature`
   - Commit your changes: `git commit -m "feat: add sustainable feature"`
   - Push to the branch: `git push origin feature/eco-friendly-feature`
   - Submit a pull request with detailed environmental impact description

4. **Green Development Guidelines**:
   - Use server components where possible for better performance and reduced energy consumption
   - Implement proper error handling and loading states
   - Ensure responsive design across all screen sizes to reduce device upgrades
   - Optimize images and assets for faster loading and reduced bandwidth
   - Test changes thoroughly to prevent bugs and waste development time
   - Focus on features that promote sustainability and environmental awareness

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full text.

---

## Contact

For support, questions, or contributions to our sustainable mission:

- **Issues**: [GitHub Issues](https://github.com/sakibullah2006/jutebag-ecommerce/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sakibullah2006/jutebag-ecommerce/discussions)
- **Email**: support@jutebaggrocery.com
- **Sustainability Inquiries**: eco@jutebaggrocery.com

---

## Environmental Impact

### Why Choose Our Eco-Bags?

- **🌱 Biodegradable**: Our jute and cotton bags naturally decompose, unlike plastic bags that persist for hundreds of years
- **♻️ Reusable**: Each bag can be used hundreds of times, replacing thousands of single-use plastic bags
- **🌿 Carbon Negative**: Jute plants absorb more CO2 than they produce, making our bags carbon-negative
- **💧 Water Efficient**: Natural fiber production uses significantly less water than synthetic alternatives
- **🌍 Plastic-Free**: Help eliminate plastic waste from our oceans and landfills
- **👥 Fair Trade**: Supporting sustainable farming communities and ethical labor practices

### Our Commitment

Every purchase contributes to:
- Reducing plastic pollution in our oceans
- Supporting sustainable farming practices
- Creating jobs in eco-friendly industries
- Promoting awareness about environmental conservation
- Building a plastic-free future for the next generation

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) for performance and sustainability
- Powered by [WooCommerce](https://woocommerce.com/) for reliable e-commerce
- Payments by [Stripe](https://stripe.com/) supporting carbon-neutral transactions
- Styled with [Tailwind CSS](https://tailwindcss.com/) using earth-inspired design
- **Special thanks** to jute farmers and sustainable textile workers worldwide
- **Inspired by** the global movement toward plastic-free living

---

Thank you for choosing JuteBag Ecommerce! Together, we're building a more sustainable future, one eco-friendly bag at a time. 🌱🛍️🌍
