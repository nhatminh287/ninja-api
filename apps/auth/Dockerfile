FROM node:alpine As development

WORKDIR /usr/src/app

# Copy necessary files and install dependencies
COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

# Copy the source code
COPY apps/auth apps/auth
COPY libs libs

# Build the application
RUN npm run build auth

# Production stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only the necessary files for production
COPY package.json ./

# Install only production dependencies
RUN npm install --prod

# Copy the built application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Start the application
CMD ["node", "dist/apps/auth/main"]
