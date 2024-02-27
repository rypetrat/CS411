# CS411
Q2: Project Description
A Health Diagnostic tool that matches symptoms to potential diseases/ailments using cosine similarity against a large database which employs ChatGPT to provide detailed information offering a smart and accessible approach to understanding health concerns.
Q3.1: Goal
Have a scalable and efficient backend system that can handle a large database of symptoms and diseases/ailments, implementing cosine similarity algorithms for symptom matching.
Q3.2: Non-Goal
Implementing real-time patient monitoring or emergency response features.
Q3.3: Non-functional requirement 1
Should maintain a response time of less than 5 seconds for symptom matching and information retrieval, even under high user load.
Q3.4: Functional requirement 1.1
		Efficient caching mechanisms to store frequently accessed symptom-disease mappings and information, reducing response times for subsequent requests.
Q3.5: Functional requirement 1.2
		Utilize parallel processing and distributed computing techniques to handle high user loads.
Q3.6: Non-functional requirement 2
Comply with relevant data protection regulations and ensure the confidentiality, integrity, and availability of patient information.
Q3.7: Functional requirement 2.1
		Implement robust access control mechanisms, such as role-based access control (RBAC) or attribute-based access control (ABAC), to ensure that only authorized personnel have access to patient information.
Q3.8: Functional requirement 2.2
		Encrypt patient information both at rest and in transit, using industry-standard encryption algorithms, to ensure its confidentiality and integrity. Access to encrypted data should be restricted to authorized users only.
Q4.1: Theme
	Empowering Health Literacy Through Intelligent Diagnosis, emphasizes the goal of the tool to empower users with detailed and understandable information about their health concerns.
Q4.2: Epic
Personalized Health Insights, emphasizes providing personalized health insights to users based on their symptoms and health concerns.
Q4.3: User story 1
As a user experiencing persistent headaches and fatigue, I want to input these symptoms into the Health Diagnostic tool to receive information about potential causes and recommended actions, helping me understand and address my health concerns effectively.
Q4.4: Task 1
Implement a symptom input form in the Health Diagnostic tool that allows users to specify their symptoms, including persistent headaches and fatigue. The form should be user-friendly and intuitive, guiding users through the process of entering their symptoms.
Q4.5: Ticket 1.1
		Design the Symptom Input Form - where users can include fields for users to specify their symptoms, should  provide clear instructions and guidance on how to enter symptoms, should be visually appealing and easy to navigate, should be responsive and work well on different devices.
Q4.6: Ticket 2.1
		Implement Symptom Validation - where ensure user has entered at least one symptom, ensure entered symptoms are recognized by the system, ensure Provide appropriate error messages.
Q4.7: User story 2
As a user with a family history of diabetes, I want to use the Health Diagnostic tool to understand my risk of developing diabetes based on my lifestyle and symptoms, so that I can take preventive measures and make informed decisions about my health.
Q4.8: Task 2
Generate and display information based on poor or good lifestyle choices (exercise/diet) that could either be positively or negatively affecting any symptoms or family history of disease based on additional data input forms either attached to the initial or as a supplemental form that can be filled out after the initial search to improve accuracy.
Q4.9: Ticket 2.1
		Implement Lifestyle Choices Input Forms - design fields for users to specify details about their exercise habits (frequency, intensity, type) as well as for diet (types of food consumed, portion sizes, frequency of unhealthy choices), Provide the option for users to fill out these forms either during the initial search or as a separate form after the initial search.
Q4.10: Ticket 2.2
		Implement Family History Input Forms - design fields for users to specify any possible family history of genetic diseases (diabetes, high blood pressure, cancer), Provide the option for users to fill out these forms either during the initial search or as a separate form after the initial search.
