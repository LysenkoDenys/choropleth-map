# 📊 Choropleth Map

An interactive choropleth map of the United States visualizing **the percentage of adults age 25 and older with a bachelor's degree or higher** (based on data from 2010–2014).

This project is part of the **Data Visualization Certification** from [freeCodeCamp](https://www.freecodecamp.org/).

## 🛠 Technologies Used

- **JavaScript (ES6)**
- **D3.js** – for SVG rendering and interactivity
- **TopoJSON** – for geographic data
- **HTML/CSS**

## 📌 Description

Each U.S. county is shaded based on the percentage of adults with a bachelor’s degree or higher.

- The color scale ranges from light (lower percentage) to dark (higher percentage).
- Hovering over a county displays a tooltip with the exact percentage and location.
- A legend is included to help interpret the color thresholds.

## 📁 Project Structure

<pre>
choropleth-map/
├── index.html
├── styles.css
├── script.js
└── README.md
</pre>

## 📈 Data Sources

- **Education data**:  
  [`for_user_education.json`](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json)

- **Geographic county data (TopoJSON)**:  
  [`counties.json`](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json)

## ✅ Tests & Requirements

This project passes all **freeCodeCamp** tests for the Choropleth Map certification project:  
[freeCodeCamp Data Visualization Projects](https://www.freecodecamp.org/learn/data-visualization/)

## 📸 Screenshot

<img width="994" height="758" alt="Image" src="https://github.com/user-attachments/assets/3447091a-39f8-476e-9ec2-0ec4537777b4" />

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/LysenkoDenys/choropleth-map.git
   Navigate to the project folder:
   ```

cd choropleth-map
Open index.html in your browser.

📄 License
MIT License
Author: Lysenko Denys
