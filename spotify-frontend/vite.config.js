import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

/* 
Vite ek modern frontend tool hai jo React projects
ke liye bahut fast dev server aur build system 
provide karta hai, jabki CRA (Create React App) purana tool hai
jo similar kaam karta tha lekin thoda slow aur heavy hai. 
Hum vite.config.js me React plugin add karte hain taaki Vite samajh sake ki hum JSX use kar rahe hain,
Fast Refresh (hot reload) enable ho, aur future me custom configurations set kar sake.
JSX React ka special syntax hai jisme hum HTML-like code JS ke andar likh sakte hain; 
ye .jsx files me likha jaata hai jo React ke components ko define karte hain. React aur Vite/CRA dono compilers ka kaam karte hain: 
JSX ko JS me convert karte hain jo browser samajh sake. JSX ke saath React automatically DOM updates ko optimize karta hai (Virtual DOM + diffing), sirf changed parts 
update karta hai, aur code clean, declarative aur reusable rehta hai. Plain JS + HTML ke comparison me JSX aur React se UI fast, maintainable aur bug-free hota hai, aur event handling, 
loops aur conditions simple ho jaate hain.
 */
/**
 JSX file (React component)
        ↓
  Vite/CRA compiler
        ↓
   Virtual DOM
        ↓
   Real DOM in Browser
 */

   /*
   Jo frontend me src/components use ho raha hai → Vite handle karta hai

Jo backend me src/components use ho raha hai → Node.js handle karta hai, Vite ka koi role nahi */

/*
Frontend (Vite + React)  ←→ Browser
Backend (Node.js / Express)  ←→ Server / Database */