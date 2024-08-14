FROM node:alpine As development

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

# Copy the application source code
COPY apps/auth apps/auth
COPY libs libs

# Install dependencies for the application
RUN cd apps/auth && npm install

# Build the application
RUN npm run build auth

# Production stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only the production package.json
COPY package.json ./

# Install production dependencies
RUN npm install --prod

# Copy the built application and node_modules from the development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Start the application
CMD ["node", "dist/apps/auth/main"]
