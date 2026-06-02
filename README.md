# QA Automation - Demoblaze

## Descripción

Este proyecto contiene la automatización de pruebas funcionales E2E y pruebas de servicios REST para la plataforma Demoblaze.

Se implementaron pruebas para:

- Registro de usuarios (Signup API)
- Inicio de sesión (Login API)
- Flujo completo de compra
- Casos positivos y negativos
- Pruebas exploratorias y documentación de hallazgos

---

# Tecnologías Utilizadas

- Cypress
- JavaScript
- Node.js

---

# Requisitos Previos

Antes de ejecutar las pruebas asegúrese de tener instalado:

- Node.js 18 o superior
- npm o pnpm
- Google Chrome

Verificar instalación:

```bash
node -v
npm -v
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

## 2. Ingresar al proyecto

```bash
cd demoblaze-cypress-e2e
```

## 3. Instalar dependencias

Con npm:

```bash
npm install
```

o con pnpm:

```bash
pnpm install
```

---

# Ejecución de Pruebas

## Ejecutar Cypress en modo interactivo

```bash
npx cypress open
```

Seleccionar:

```text
E2E Testing
Chrome
```

---

## Ejecutar pruebas E2E

Seleccionar el archivo:

```text
cypress/e2e/demoblaze-purchase-flow.cy.js
```

### Casos cubiertos

- Apertura de la página principal
- Agregar productos al carrito
- Visualizar carrito
- Validar productos agregados
- Validar total de compra
- Completar formulario
- Finalizar compra
- Validar mensaje de compra exitosa

---

## Ejecutar pruebas de API

Seleccionar el archivo:

```text
cypress/e2e/demoblaze-auth-api.cy.js
```

### Casos cubiertos

#### Signup API

- Registrar nuevo usuario
- Intentar registrar usuario existente

#### Login API

- Login válido
- Login inválido

---

## Ejecutar todas las pruebas desde consola

```bash
npx cypress run
```

o utilizando pnpm:

```bash
pnpm exec cypress run
```

---

# Estructura del Proyecto

```text
demoblaze-cypress-e2e/
│
├── cypress/
│   ├── e2e/
│   │   ├── demoblaze-purchase-flow.cy.js
│   │   └── demoblaze-auth-api.cy.js
│   │
│   ├── fixtures/
│   └── support/
│
├── README.md
├── conclusiones.md
├── conclusiones.txt
├── cypress.config.js
├── package.json
└── package-lock.json
```

---

# Casos Automatizados

## API REST

### Signup

- Registro exitoso de usuario
- Validación de usuario existente

### Login

- Autenticación exitosa
- Autenticación fallida

---

## Pruebas E2E

### Flujo completo de compra

1. Acceder al sitio.
2. Agregar Samsung Galaxy S6.
3. Agregar Nokia Lumia 1520.
4. Visualizar carrito.
5. Validar productos agregados.
6. Validar total calculado.
7. Completar formulario de compra.
8. Confirmar compra.
9. Validar mensaje de éxito.

---

# Evidencias y Hallazgos

Los hallazgos encontrados durante la ejecución de las pruebas se encuentran documentados en:

```text
conclusiones.md
conclusiones.txt
```

Entre los principales hallazgos identificados:

- Compra permitida con carrito vacío.
- Finalización de compra con carrito vacío.
- Campo Credit Card acepta texto arbitrario.
- Productos duplicados no consolidan cantidad.
- Registro permitido con usernames extremadamente largos.

---

# Resultado de la Prueba Técnica

### API REST

| Caso | Resultado |
|--------|------------|
| Signup nuevo usuario | ✅ |
| Signup usuario existente | ✅ |
| Login válido | ✅ |
| Login inválido | ✅ |

### E2E

| Caso | Resultado |
|--------|------------|
| Flujo completo de compra | ✅ |
| Validación de carrito | ✅ |
| Validación de formulario | ✅ |
| Compra exitosa | ✅ |

---

# Autor

Ing. Melvin Maldonado

Prueba técnica desarrollada utilizando Cypress para automatización de pruebas funcionales E2E y pruebas de servicios REST.