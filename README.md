# Exchange Rate Converter

A modern web application that displays real-time exchange rates for converting **Nigerian Naira (NGN) to Ghanaian Cedi (GHS) and vice versa** using **Bybit P2P rates**. The rates update dynamically to reflect the latest market values.

## Features

✅ **Live Exchange Rates** - Automatically fetches Binance P2P rates and updates without refreshing the page.  
✅ **Accurate Conversion Logic** - Converts NGN → USD → GHS and GHS → USD → NGN using real-time rates.  
✅ **Beautiful UI with Light/Dark Mode** - A sleek, modern interface with smooth animations and responsive design.  
✅ **Admin Dashboard** - Displays detailed conversion steps (NGN → USD → GHS) only for the admin, without requiring login.  
✅ **Conversion Calculator** - Allows users to input an amount and instantly see the converted value.  
✅ **Deployment Ready** - Optimized for performance and SEO, with easy deployment to Vercel, Netlify, or AWS.  

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **API:** Binance P2P API for real-time exchange rates  
- **State Management:** React Context API  
- **Animations:** Framer Motion for smooth UI effects  

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/luckys-lnz/exchange-app.git
   cd exchange-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_BINANCE_API_URL=https://api.binance.com/
```

## Deployment

To deploy on **Vercel**, run:
```sh
vercel
```
To deploy on **Netlify**, run:
```sh
netlify deploy
```

## Usage

1. **View Exchange Rates**: The homepage displays real-time NGN ↔ GHS rates.  
2. **Use the Calculator**: Enter an amount to see the live conversion.  

-- > [!NOTE]
> Admin Dashboard is not yet implemented.
3. **Admin Dashboard**: If you are the admin, visit `/admin` to see conversion breakdowns.  

## Future Enhancements

- Rate history tracking
- Notifications for rate changes
- Multi-currency support

## License

MIT License © 2025

Luckys-lnz

*All rights reserved.*

