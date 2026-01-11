# Frontend Dockerfile

# Use Nginx as a base image
FROM nginx:alpine

# Copy the frontend files into the Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
