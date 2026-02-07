# Dashboard Design Specification

## Visual Layout

```
┌─────────────────────────────────────────┐
│           WELCOME BACK!                 │
│   What would you like to explore today? │
└─────────────────────────────────────────┘

┌──────────────────┬──────────────────────┐
│                  │                      │
│    ╭──────╮      │     ╭──────╮        │
│    │ 📰  │      │     │ 🏪  │        │
│    ╰──────╯      │     ╰──────╯        │
│                  │                      │
│      News        │      Vendors         │
│                  │                      │
│  [Pink Gradient] │  [Amber Gradient]    │
└──────────────────┴──────────────────────┘

┌──────────────────┬──────────────────────┐
│                  │                      │
│    ╭──────╮      │     ╭──────╮        │
│    │ ✓   │      │     │ 🏠  │        │
│    ╰──────╯      │     ╰──────╯        │
│                  │                      │
│    Checklist     │       Home           │
│                  │                      │
│  [Green Gradient]│  [Blue Gradient]     │
└──────────────────┴──────────────────────┘

        Your wedding planning journey
              starts here
```

## Card Design Details

### Card Structure
```
┌─────────────────────────────────────┐
│                                     │
│         ╭─────────────╮             │
│         │   ░░░░░░░   │  ← Frosted │
│         │   ░ ICON ░  │    Glass   │
│         │   ░░░░░░░   │    Circle  │
│         ╰─────────────╯             │
│                                     │
│            TITLE                    │
│                                     │
│                        ◯  ← Decor   │
│                       ◯◯            │
└─────────────────────────────────────┘
```

## Color Specifications

### News Card
- **Gradient**: `linear-gradient(135deg, #ec4899 0%, #f472b6 100%)`
- **Shadow**: `rgba(236, 72, 153, 0.3)`
- **Icon**: News/Newspaper (white)
- **Route**: `/user/news`

### Vendors Card
- **Gradient**: `linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)`
- **Shadow**: `rgba(245, 158, 11, 0.3)`
- **Icon**: Store/Shop (white)
- **Route**: `/user/vendors`

### Checklist Card
- **Gradient**: `linear-gradient(135deg, #10b981 0%, #34d399 100%)`
- **Shadow**: `rgba(16, 185, 129, 0.3)`
- **Icon**: Checklist/Check Circle (white)
- **Route**: `/user/tools/checklist`

### Home Card
- **Gradient**: `linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)`
- **Shadow**: `rgba(59, 130, 246, 0.3)`
- **Icon**: Home (white)
- **Route**: `/user/home`

## Spacing & Sizing

### Container
- **Max Width**: `448px` (28rem)
- **Padding**: `16px` (1rem)
- **Background**: Theme secondary background

### Grid
- **Columns**: 2
- **Gap**: `16px` (1rem)
- **Card Min Height**: `160px`

### Card Elements
- **Border Radius**: `16px` (rounded-2xl)
- **Padding**: `24px` (p-6)
- **Icon Container Size**: `64px` (w-16 h-16)
- **Icon Size**: `32px` (xl)
- **Decorative Circle**: `96px` (w-24 h-24)

### Typography
- **Header Title**: `24px` (text-2xl), bold
- **Header Subtitle**: `14px` (text-sm), secondary color
- **Card Title**: `18px` (text-lg), semibold, white
- **Footer Text**: `12px` (text-xs), tertiary color

## Interaction States

### Hover (Desktop)
```css
transform: translateY(-4px);
box-shadow: 0 8px 20px [color-shadow];
transition: all 200ms ease;
```

### Active (Touch)
```css
transform: scale(0.95);
transition: all 200ms ease;
```

### Default
```css
transform: translateY(0);
box-shadow: 0 4px 12px [color-shadow];
transition: all 200ms ease;
```

## Glassmorphism Effect

### Icon Container
```css
background: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(10px);
border-radius: 50%;
```

### Decorative Circle
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
position: absolute;
bottom: -32px;
right: -32px;
```

## Responsive Behavior

### Mobile (320px - 767px)
- 2x2 grid maintained
- Cards stack vertically in pairs
- Full-width container with padding
- Touch-optimized tap targets

### Tablet (768px - 1023px)
- Same 2x2 grid
- Slightly larger cards
- More breathing room

### Desktop (1024px+)
- Centered layout
- Max-width constraint
- Hover effects enabled
- Larger shadows on hover

## Accessibility

### Keyboard Navigation
- All cards are focusable buttons
- Tab order: News → Vendors → Checklist → Home
- Enter/Space to activate

### Screen Readers
- Semantic button elements
- Clear descriptive text
- Proper heading hierarchy

### Touch Targets
- Minimum 44x44px tap area
- Adequate spacing between cards
- Visual feedback on interaction

## Animation Timing

- **Transition Duration**: 200ms
- **Easing**: ease-in-out
- **Hover Lift**: 4px
- **Active Scale**: 0.95
- **Shadow Spread**: 8px increase on hover

## Theme Integration

### Light Mode (Default)
- Background: `#f9fafb` (gray-50)
- Text Primary: `#111827` (gray-900)
- Text Secondary: `#4b5563` (gray-600)
- Text Tertiary: `#9ca3af` (gray-400)

### Dark Mode (If Implemented)
- Background: `#1f2937` (gray-800)
- Text Primary: `#f9fafb` (gray-50)
- Text Secondary: `#d1d5db` (gray-300)
- Text Tertiary: `#9ca3af` (gray-400)
- Card gradients remain vibrant

## Performance Considerations

- No heavy images
- CSS gradients only
- Minimal re-renders
- Optimized transitions
- Fast initial load
- Smooth 60fps animations

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## Design Inspiration

The dashboard design is inspired by:
- **Swiggy**: Card-based navigation with vibrant gradients
- **Material Design**: Elevation and shadow system
- **iOS**: Glassmorphism effects
- **Modern Web**: Clean, minimal, premium feel

## Comparison with Reference Image

### Similarities
- 2x2 grid layout
- Card-based navigation
- Vibrant colors
- Clean, modern design
- Touch-friendly

### Enhancements
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Theme integration
- Better accessibility
