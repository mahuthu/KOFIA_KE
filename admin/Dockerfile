# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Set Yarn network timeout
RUN yarn config set network-timeout 600000

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable and build the React application
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

# Use a smaller image for the final build
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# COPY ./ssl/fullchain.pem /etc/nginx/ssl/
# COPY ./ssl/privkey.pem /etc/nginx/ssl/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
