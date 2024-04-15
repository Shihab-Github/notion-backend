FROM node:20-alpine
WORKDIR /app
copy package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
