## Inspiration

The relentless wildfires raging across Los Angeles have pushed local authorities, particularly the Los Angeles Fire Department (LAFD), to the brink. Already understaffed compared to national standards for large cities, the department is struggling to manage the overwhelming demands of the crisis. The staffing shortages have forced available personnel to work extended shifts, sometimes lasting 24 hours or more, leading to fatigue that can impact decision-making and safety in high-stress situations.

Adding to the challenge, over 16,000 personnel are currently deployed alongside thousands of pieces of equipment, stretching resources to their absolute limit. This unprecedented mobilization is unsustainable, with the risk of equipment wear and tear and mounting burnout among first responders.

Recognizing these critical issues, our team was driven to develop Sheltr, a crowdsourced disaster overwatch app. Designed to relieve some of the burden on overstretched local authorities, Sheltr empowers the general population to contribute actively to disaster management. By allowing citizens to report incidents, share critical updates, and assist with relief efforts in real-time, Sheltr provides a much-needed boost to emergency response capabilities, enhancing coordination and resilience during this challenging time.

## What it does

Sheltr harnesses the power of crowdsourcing to create a safe and dynamic overwatch system for disaster management. Once users create an account and log into the app, they are presented with a live feed displaying real-time updates about ongoing incidents in their local area.

For those who wish to contribute, Sheltr offers an intuitive map feature. Users can create disaster reports by simply dropping a pin on the exact location of an incident and providing key details. These reports include the type of disaster occurring, a description of the event, the time and location, and an assessment of the situation’s severity.

To ensure the most critical updates receive attention, Sheltr uses a community-driven prioritization system. Reports with the most likes are pushed to the top of the feed, highlighting the most pressing issues for both responders and the community. This streamlined approach ensures that vital information is easily accessible, improving situational awareness and enabling quicker, more effective responses to disasters.

## How we built it

For the development of Sheltr we employed a robust tech stack to ensure the app is reliable, responsive, and secure.

Backend Development:
- Next.js Route Handlers and Form Actions as a way to handle server logic like database communication and handling auth sessions
- Supabase as our main database and auth provider

Frontend Development:
- Next.js as the main driver for building a progressive web app that adapts to mobile users
- TailwindCSS for framework styling
- Figma for frontend design and planning

## What's next for Sheltr

Sheltr aims to continue its enhancement by gathering user feedback and driving its design from there. 

We are also considering potential development features like:
- Partnering with local authorities or emergency services for a faster response time to save more lives. Disaster zones would immediately be sent to the authorities.
- Using collected data on disasters to contribute to predictive AI models to allow the development for early warning systems, improved resource allocation, and enhanced disaster response strategies
- Collaborating with professionals to create an AI agent that will safely guide a citizen that may be in potential danger
