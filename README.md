# Shoe Inventory System

A static mobile-friendly shoe intake app for the `shoe-inventory-system` GitHub repo, with Supabase as the backend.

## What it does

- Lets you upload up to 4 photos from a phone.
- Prompts for `box` or `no box`.
- Saves `brand`, `description`, `size`, `price`, `notes`, and photo URLs.
- Supports AI-assisted field fill from box photos or shoe photos through a Supabase Edge Function.
- Lists saved inventory underneath the intake form.

## Files

- `index.html`: GitHub Pages friendly frontend.
- `supabase/schema.sql`: table, storage bucket, and RLS setup.
- `supabase/functions/shoe-intake-ai/index.ts`: starter Edge Function for OpenAI vision lookup.

## Setup

1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql`.
3. In `index.html`, replace the `APP_CONFIG.supabaseUrl` and `APP_CONFIG.supabaseAnonKey` placeholders.
4. Deploy this folder to GitHub Pages.
5. Optional: deploy the `shoe-intake-ai` Edge Function if you want AI autofill.
6. If you use the AI function, set `OPENAI_API_KEY` in Supabase secrets and deploy with `supabase functions deploy shoe-intake-ai`.

## GitHub Pages

This app is static, so it can be hosted directly from a GitHub repository.

## AI flow

- If `box` is selected, the UI prompts the AI function to read the box label.
- If `no box` is selected, the UI prompts the AI function to infer brand, description, and size from the photos.
- Price is always entered manually in the form.
