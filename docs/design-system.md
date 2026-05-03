# Genio Design System

## Visual direction

Genio should feel modern, clean, friendly, elegant, creative, and trustworthy.

The interface must be simple enough for non-technical users and polished enough to feel like a real SaaS product.

## Brand personality

Genio should communicate:

- Simplicity.
- Confidence.
- Creativity.
- Professionalism.
- Warmth.
- Speed.
- Accessibility.

The product should make users feel that creating a website is easy, guided, and achievable.

## Target visual audience

Genio is focused on entrepreneurs, local stores, small businesses, and service providers. The visual language should work especially well for small business owners who want something professional but not intimidating.

The design should avoid looking too technical, dark, aggressive, or developer-focused.

## Color system

Use the current Genio palette as the main reference, especially the existing blue tones used in the editor and UI.

Recommended core colors:

- Deep blue: `#2E388E`
- Bright blue: `#257DC1`
- Turquoise accent: `#14B8A6`
- Soft background: `#F8FAFC`
- White: `#FFFFFF`
- Dark text: `#0F172A`
- Muted text: `#64748B`
- Soft border: `#E2E8F0`

Semantic colors:

- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`

## Color usage

- Use deep blue for primary actions, important navigation, and brand moments.
- Use bright blue for hover states, active states, and highlights.
- Use turquoise as an accent, not as the main color on every screen.
- Use light backgrounds for dashboard pages.
- Use white cards over soft backgrounds.
- Use muted text for descriptions, timestamps, helper text, and secondary labels.
- Avoid using too many saturated colors in the same view.

## Typography

The UI should use clear, readable typography.

Rules:

- Page titles should be clear and confident.
- Section headings should create visual hierarchy.
- Body text should be readable and concise.
- Labels should be short and understandable.
- Avoid long paragraphs inside dashboards.

Suggested hierarchy:

- Page title: large, bold, clear.
- Section title: medium-large, semibold.
- Card title: medium, semibold.
- Description: small or base, muted.
- Metadata: small, muted.

## Layout principles

- Use generous spacing.
- Group related elements inside cards or clear sections.
- Keep one primary action per screen when possible.
- Use empty states when there is no data.
- Keep dashboards easy to scan.
- Do not overcrowd pages with too many filters, buttons, or labels.
- Prefer progressive disclosure: show advanced options only when needed.

## Cards

Cards should be used for:

- Site previews.
- Dashboard metrics.
- Template previews.
- Product previews.
- Settings sections.
- Empty states.

Card rules:

- Use rounded corners, preferably `rounded-2xl`.
- Use soft borders.
- Use subtle shadows only when useful.
- Use consistent padding.
- Each card should have one clear purpose.
- Avoid putting too many actions inside one card.

## Buttons

Primary buttons:

- Use for the main action on a screen.
- Use deep blue or strong brand gradient.
- Should be visually obvious.

Secondary buttons:

- Use for supporting actions.
- Prefer outline, muted, or white backgrounds.

Destructive buttons:

- Use only for delete or dangerous actions.
- Must be visually distinct.
- Should usually require confirmation when data loss is possible.

Button text should be action-oriented:

- Good: `Crear sitio`, `Publicar`, `Guardar cambios`, `Ver en vivo`.
- Avoid: `Aceptar`, `Enviar`, `Click aquí` when a clearer action exists.

## Forms

Forms should be simple and guided.

Each field should have:

- Clear label.
- Helpful placeholder when useful.
- Error message when validation fails.
- Reasonable default value when possible.

Rules:

- Avoid asking for too much information at once.
- Break complex forms into sections or steps.
- Keep labels friendly and non-technical.
- Use helper text for fields that may confuse non-technical users.

## Dashboard UI

Dashboard pages should include:

- Clear page title.
- Short description when useful.
- Primary action near the title.
- Search/filter only when the list needs it.
- Cards or tables depending on the content.
- Empty state when there is no data.

For site lists:

- Show title.
- Show path or public URL.
- Show updated date.
- Show status when available.
- Provide clear actions: edit, preview, favorite, delete, restore.

## Editor UI

The editor should prioritize workspace clarity.

Rules:

- Do not add heavy UI around Puck unless it improves the editor workflow.
- Keep navigation and live preview actions clear.
- Preserve editor performance.
- Make recent designs easy to access but not distracting.
- Editor actions should be short and obvious.

## Published pages

Published pages should feel professional and responsive.

Rules:

- Components must look good on mobile, tablet, and desktop.
- Sections should use consistent spacing.
- Headers and footers must be functional.
- Buttons and links must be visible and accessible.
- Avoid broken layouts when users enter long text.

## Motion and animation

Use motion carefully.

Good uses:

- Small hover states.
- Smooth drawer/menu transitions.
- Subtle hero animations.
- Light card transitions.

Avoid:

- Too many animations on dashboard screens.
- Animations that slow down the editor.
- Motion that distracts from content creation.

## Accessibility basics

- Use readable contrast.
- Buttons and links must be keyboard accessible.
- Images should have meaningful alt text when possible.
- Form inputs should have labels.
- Avoid relying only on color to communicate state.

## Writing style in the UI

Use friendly Spanish for end users unless a screen is intentionally technical.

Good examples:

- `Crea tu primer sitio`
- `Edita tu diseño`
- `Ver en vivo`
- `No tienes sitios todavía`
- `Empieza con una plantilla`

Avoid overly technical labels:

- `Documento JSON`
- `Schema`
- `Mutation`
- `Data object`

## Design rule of thumb

Every screen should answer quickly:

1. Where am I?
2. What can I do here?
3. What is the most important action?
4. What happens next?
