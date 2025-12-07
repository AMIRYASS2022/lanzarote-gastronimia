# LanzaroteGastro

## How to deploy to Netlify

1. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub.
   - Follow the instructions to push an existing repository:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/lanzarote-gastro.git
     git branch -M main
     git push -u origin main
     ```

3. **Connect to Netlify**
   - Go to [Netlify](https://www.netlify.com/).
   - Click "Add new site" > "Import an existing project".
   - Select **GitHub**.
   - Choose your `lanzarote-gastro` repository.
   - **Build Settings:**
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click **Deploy Site**.

## Environment Variables
If you are using the AI features, remember to add your `API_KEY` in the Netlify Site Settings > Environment Variables.
