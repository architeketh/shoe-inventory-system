# Shoe Inventory System

A static mobile-friendly shoe inventory app for the `shoe-inventory-system` repo, with GitHub Pages for hosting, Supabase for storage and Edge Functions, and OpenAI for AI-assisted intake and pricing.

## Main Files

- `index.html`
- `supabase/schema.sql`
- `supabase/functions/shoe-intake-ai/index.ts`
- `supabase/functions/shoe-price-ai/index.ts`
- `SYSTEM-REFERENCE.md`

## Setup Summary

1. Create or choose your Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Confirm `OPENAI_API_KEY` exists in Supabase secrets.
4. Deploy:
   - `shoe-intake-ai`
   - `shoe-price-ai`
5. Push `index.html` to GitHub.
6. Publish with GitHub Pages.

## Reference Guide

For the full operating guide, tool stack, AI flows, pricing process, and data model, see:

- `SYSTEM-REFERENCE.md`
