# Mind 🧠

Ever find yourself saving random links and notes to WhatsApp just so you don't forget them? Mind is here to help! It's like having a super organized friend who remembers everything for you.

## What does Mind do?

Think of Mind as your digital memory box where you can:
- 📝 Save important links and notes
- 🏷️ Tag them so you can find stuff later
- 🔗 Share your entire knowledge collection with friends
- 🔍 Never lose track of that one article you wanted to read

It's basically WhatsApp's "Saved Messages" but way better!

## Quick Start (Get up and running in 5 minutes!)

### Step 1: Get the code
```bash
git clone <your-repo-url>
cd mind
```

### Step 2: Install stuff
```bash
npm install
```

### Step 3: Set up your secrets
Create a file called `.env` and add:
```env
MONGODB_URI=your_mongodb_url_here
secretKey=make_this_super_secret
```

### Step 4: Start it up!
```bash
npm run dev
```

Visit `http://localhost:3000` and you're good to go! 

## How to use Mind (The simple way)

### 1. Create your account
```bash
# Sign up
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","password":"yourpassword"}'
```

### 2. Log in and get your magic key
```bash
# Sign in (you'll get a token back - save this!)
curl -X POST http://localhost:3000/api/v1/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","password":"yourpassword"}'
```

### 3. Save something cool
```bash
# Add content (replace YOUR_TOKEN with the token from step 2)
curl -X POST http://localhost:3000/api/v1/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Awesome Cat Videos","link":"https://youtube.com/cats","type":"video"}'
```

### 4. See all your saved stuff
```bash
# Get all your content
curl -X GET http://localhost:3000/api/v1/content \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Share your brain with friends! 
```bash
# Create a shareable link
curl -X POST http://localhost:3000/api/v1/brain/share \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"share":true}'
```

Now anyone can see your saved content by visiting:
`http://localhost:3000/api/v1/brain/YOUR_SHARE_HASH`

## What's under the hood?

Mind is built with some pretty cool tech:
- **Node.js & Express** - The brain of the operation
- **MongoDB** - Where all your memories live
- **JWT tokens** - Keeps your stuff secure
- **TypeScript** - Makes the code less buggy

## The Simple API Guide

Don't worry, you don't need to be a developer to use this!

| What you want to do | How to do it |
|-------------------|-------------|
| Make an account | `POST /api/v1/signup` |
| Log in | `POST /api/v1/signin` |
| Save something | `POST /api/v1/content` |
| See your stuff | `GET /api/v1/content` |
| Delete something | `DELETE /api/v1/content` |
| Share your brain | `POST /api/v1/brain/share` |
| View someone's shared brain | `GET /api/v1/brain/:hash` |

## File Structure (What's what)

```
mind/
├── index.ts          # The main file (server starts here)
├── db.ts             # Database stuff (where data is stored)
├── middleware.ts     # Security guard (checks if you're logged in)
├── utils.ts          # Helper functions
└── README.md         # This file you're reading!
```

---

*P.S. - Mind is open source and free forever. Because good tools should be available to everyone!*
