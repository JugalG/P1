<details> <summary>📁 <code>architecture.md</code> (copy-paste ready)</summary>
# System Architecture Diagram (Mermaid.js)

```mermaid
flowchart TB
    %% Frontend Browser Layer
    subgraph "Frontend Browser" 
        direction TB
        UIPages["UI Pages"]:::ui
        subgraph "Pages" 
            direction TB
            LoginPage["Login Page"]:::ui
            HomepagePage["Homepage"]:::ui
            ProductPage["Product Page"]:::ui
            CheckoutPage["Checkout Page"]:::ui
        end
        UIComponents["Shared Components"]:::ui
        subgraph "Cart Components"
            direction TB
            Cart["Cart"]:::ui
            CartItem["CartItem"]:::ui
            CartWrapper["CartWrapper"]:::ui
        end
        subgraph "Product Card Components"
            direction TB
            ProductData["productData"]:::ui
            ProductGrid["productGrid"]:::ui
        end
        subgraph "Quick-View Modal Components"
            direction TB
            QuickView["ProductQuickView"]:::ui
            QuickViewModal["ProductQuickViewModal"]:::ui
            QuickViewClose["ProductQuickViewModalCloseButton"]:::ui
        end
        ReduxStore["Redux Store"]:::state
        subgraph "Redux Slices & Provider"
            direction TB
            CartSlice["cartSlice"]:::state
            ProductSlice["productSlice"]:::state
            StoreProvider["StoreProvider"]:::state
        end
        subgraph "Custom Hooks"
            direction TB
            UseAuth["useAuth"]:::state
            UseCartSync["useCartSync"]:::state
        end
        APIUtil["api.ts"]:::state
        Helper["sortingLogicHelper"]:::state
        Storage["sessionStorage + auth-cookie"]:::state
    end

    %% Next.js App Layer
    subgraph "Next.js Application (Server + Client)"
        direction TB
        AppLayout["Main App Layout"]:::api
        subgraph "API Routes (Middleware)"
            direction TB
            APILogin["/api/login"]:::api
            APILogout["/api/logout"]:::api
            APISession["/api/session"]:::api
            APIProducts["/api/products"]:::api
        end
        SSR["SSR for Product Page"]:::api
        StaticAssets["Public Assets"]:::api
    end

    %% Mock Backend Layer
    subgraph "Mock Backend (json-server)"
        direction TB
        JSONServer["json-server"]:::backend
        DB["db.json (Data Store)"]:::db
    end

    %% External Tools Layer
    subgraph "External Tools"
        direction TB
        Jest["Jest & Testing Library"]:::external
        PostCSS["PostCSS"]:::external
    end

    %% Connections
    LoginPage -->|submits credentials| APILogin
    APILogin -->|validates| JSONServer
    JSONServer -->|user data| APILogin
    APILogin -->|sets cookie| Storage

    ProductPage -->|request data| SSR
    SSR -->|fetch| APIProducts
    APIProducts --> JSONServer
    APIProducts -->|respond products| SSR
    SSR --> ProductPage

    HomepagePage -->|fetch products| APIProducts
    CheckoutPage -->|protected via| APISession
    APISession -->|validates| Storage

    UIPages -->|renders shared| UIComponents
    UIPages --> ReduxStore
    ReduxStore --> StoreProvider
    StoreProvider --> CartSlice
    StoreProvider --> ProductSlice
    CartSlice --> APIUtil
    ProductSlice --> APIUtil
    APIUtil --> APIProducts
    APIUtil --> APILogin
    APIUtil --> APILogout

    Cart -->|dispatch actions| CartSlice
    CartSlice -->|sync| UseCartSync
    UseCartSync --> APIUtil
    ProductGrid -->|show items| ProductPage
    QuickView -->|open modal| QuickViewModal
    QuickViewModalClose --> QuickViewModal

    Storage --> APISession

    JSONServer --> DB

    AppLayout --> UIPages
    AppLayout --> StaticAssets

    Jest -->|tests| UIComponents
    Jest -->|tests| CartSlice
    PostCSS --> StaticAssets

    %% Styles
    classDef ui fill:#D0E8FF,stroke:#0366D6,stroke-width:1px
    classDef state fill:#E6F4EA,stroke:#22863A,stroke-width:1px
    classDef api fill:#FFEFD5,stroke:#FF8C00,stroke-width:1px
    classDef backend fill:#F0F0F0,stroke:#6A737D,stroke-width:1px
    classDef db fill:#EAEAEA,stroke:#6A737D,stroke-width:1px,stroke-dasharray: 5 5
    classDef external fill:#F5F0FF,stroke:#6F42C1,stroke-width:1px

</details>
