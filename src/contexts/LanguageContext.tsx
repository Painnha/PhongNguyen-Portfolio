import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'vi' || saved === 'en') ? saved : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Simple translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm Nguyễn Trí Phong",
      role: 'Aspiring Full-Stack Developer | AI Enthusiast & Esports Community Leader',
      description: 'Fresh graduate in Software Engineering from IUH. Passionate about building innovative full-stack applications with AI integration. From developing a smart major recommendation system using Python, React, Node.js, TensorFlow, and MongoDB, to performing automation testing with MESHA during my 3-month internship at FSoft, I blend frontend, backend, and AI to create impactful solutions. I leverage AI tools like Cursor, ChatGPT, Gemini, and Grok to accelerate development – from generating code ideas and debugging to optimizing workflows in projects and assignments.',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
    },
    about: {
      title: 'About',
      titleHighlight: 'Me',
      subtitle: 'My journey from IUH Software Engineering to AI development and esports leadership.',
      myJourney: 'My Journey',
      para1: "My tech journey started at IUH in Software Engineering, where I built full-stack projects like an AI-powered admission system using Python, React, Node.js, TensorFlow, and MongoDB – recommending academic paths with high accuracy.",
      para2: "I integrate AI tools like Cursor for code generation, ChatGPT/Gemini for debugging, and Grok for research – accelerating my workflow by up to 30% in FSoft internship and projects.",
      para3: "Passionate about esports, I lead Liên Quân Mobile community at IUH, organizing events for 500+ members – honing leadership and teamwork, reinforced by my love for soccer.",
      highlight1: 'Graduated from IUH with strong foundation in Software Engineering',
      highlight2: 'Interned at FSoft, performing automation testing with MESHA and managing tasks via Azure DevOps',
      highlight3: 'Built AI-powered student admission recommendation system using TensorFlow',
      highlight4: 'Led esports community with 500+ members in Liên Quân Mobile',
      openToRoles: '💼 Currently open to full-stack developer roles with AI/ML focus',
      codeComment: 'Smart Admission System',
    },
    skills: {
      title: 'Tech',
      titleHighlight: 'Stack',
      subtitle: 'Technologies and tools I\'ve used in real projects. Hover for context and experience.',
      frontend: 'Frontend',
      backend: 'Backend',
      aiml: 'AI/ML',
      tools: 'Tools',
      softSkills: '🤝 Soft Skills',
      alwaysLearning: 'Always learning and exploring new technologies',
      // Frontend
      react: 'React',
      reactDesc: 'Used in AI Student Admission System, CheckIn IUH Frontend with modern UI and Chart.js for data visualization.',
      reactNative: 'React-Native',
      reactNativeDesc: 'Mobile app development for RecipeFoodApp (recipe search app)',
      htmlCssJs: 'HTML/CSS/JS',
      htmlCssJsDesc: 'PCastPro broadcast overlay toolkit for esports tournaments',
      // Backend
      nodejs: 'Node.js',
      nodejsDesc: 'Used in multiple projects with Express for REST APIs, and Socket.io for real-time features.',
      java: 'Java',
      javaDesc: 'Used in PoLa Payroll Management System with Swing GUI and SQL Server.',
      python: 'Python',
      pythonDesc: 'Backend for AI system with Flask framework, TensorFlow/Keras, and data processing libraries.',
      databases: 'Databases',
      databasesDesc: 'Experience with both SQL (SQL Server) and NoSQL (MongoDB) databases.',
      jwtAuth: 'JWT Auth',
      jwtAuthDesc: 'Implemented secure authentication in AI Student Admission System and CheckIn IUH.',
      // AI/ML
      tensorflow: 'TensorFlow/Keras',
      tensorflowDesc: 'Built deep learning models for AI Student Admission System (70% accuracy).',
      sklearn: 'Scikit-learn',
      sklearnDesc: 'Applied machine learning algorithms for data analysis and prediction.',
      numpy: 'NumPy/Pandas',
      numpyDesc: 'Core libraries for data manipulation and analysis in AI projects.',
      // Tools
      git: 'Git/GitHub',
      gitDesc: 'Version control across all personal and team projects.',
      aiAssisted: 'AI-Assisted Dev',
      aiAssistedDesc: 'Leveraging AI tools like Cursor and ChatGPT to accelerate development, debugging, and research.',
      azure: 'Azure DevOps',
      azureDesc: 'Used in FSoft internship for task management and bug tracking in teamwork environment.',
      mesha: 'MESHA',
      meshaDesc: 'FSoft\'s proprietary automation testing tool used during 3-month internship.',
      obs: 'OBS',
      obsDesc: 'Integration for broadcast overlay in PCastPro toolkit.',
      // Soft Skills
      leadership: 'Leadership',
      leadershipDesc: 'Led 500+ member Liên Quân community at IUH',
      eventManagement: 'Event Management',
      eventManagementDesc: 'Organized esports tournaments and tech events',
      teamwork: 'Teamwork',
      teamworkDesc: 'Collaborated on group projects like Recipe and FSoft internship',
      communication: 'Communication',
      communicationDesc: 'Presenting technical concepts in community events and projects',
    },
    projects: {
      title: 'Featured',
      titleHighlight: 'Projects',
      subtitle: 'A showcase of my recent work spanning full-stack development, AI/ML, and community-focused applications.',
      viewAllGithub: 'View All Projects on GitHub',
      frontend: 'Frontend',
      backend: 'Backend',
      code: 'Code',
      demo: 'Demo',
      details: 'Details',
      // Project titles and descriptions
      aiAdmissionTitle: 'AI Student Admission System',
      aiAdmissionDesc: 'An intelligent system that recommends optimal academic paths for university applicants. It uses a neural network trained on historical admission data, achieving a 70% accuracy rate in its predictions.',
      pcastProTitle: 'PCastPro',
      pcastProDesc: 'Broadcast overlay and pick/ban production toolkit for Liên Quân esports. Includes scene layouts, pick/ban visuals, and streamlined show control for tournaments.',
      recipeFoodTitle: 'RecipeFoodApp',
      recipeFoodDesc: 'A React Native mobile application that allows users to view and search for cooking recipes on mobile devices.',
      polaTitle: 'PoLa Payroll Management System',
      polaDesc: 'Payroll management system for PoLa clothing factory, supporting administrative staff and worker management, attendance tracking, and salary calculation. Includes Excel report export and salary slip printing for both time-based and piece-rate workers.',
      iuhCheckinTitle: 'IUH Check-In System',
      iuhCheckinDesc: 'Full-stack check-in application for IUH (Industrial University of Ho Chi Minh City) with JWT authentication, protected routes, and QR code support. Features modern UI with gradient designs and responsive layout. Test account: username "admin", password "123".',
      iuhEsportsTitle: 'IUH Esports Community Leader',
      iuhEsportsDesc: 'Founded and managed the Liên Quân Mobile community for IUH, growing it to over 700 members. Organized multiple successful tournaments, leading to being awarded "The Best Community Leader".',
    },
    achievements: {
      title: 'Awards &',
      titleHighlight: 'Achievements',
      subtitle: 'A recognition of my dedication, expertise, and contributions in both technical and community-driven projects.',
      paperTitle: 'Scientific Paper Publication',
      paperDesc: 'Published research on "Building an Intelligent Major Recommendation System" at the university-level scientific conference.',
      certTitle: 'Certificate of Merit',
      certDesc: 'Awarded for significant contributions to community activities with the IUH Check-In application.',
      leaderWinterTitle: 'The Best Community Leader',
      leaderWinterDesc: 'Recognized for outstanding leadership in organizing esports tournaments. "Four Regions Battle - Winter 2025".',
      leaderSpringTitle: 'The Best Community Leader',
      leaderSpringDesc: 'Recognized for outstanding leadership in organizing esports tournaments. "Four Regions Battle - Spring 2025".',
      viewPaper: 'View Paper',
      viewPost: 'View Post',
    },
    contact: {
      title: "Let's",
      titleHighlight: 'Connect',
      subtitle: "I'm always open to discussing new opportunities, collaborations, or just having a chat about tech and gaming!",
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your.email@example.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project or opportunity...',
      send: 'Send Message',
      sending: 'Sending...',
      getInTouch: 'Get in Touch',
      getInTouchDesc: 'Feel free to reach out through any of these platforms. I usually respond within 24 hours!',
      location: '📍 Ho Chi Minh City, Vietnam',
      available: '⏰ Available for freelance & full-time',
      footer: '© 2025 Phong Nguyen. Built with React, Tailwind CSS, and Motion',
      footerSub: 'Designed & Developed with 💙 for innovation and esports',
      messageSent: "Message sent! I'll get back to you soon.",
      messageFailed: 'Failed to send message. Please try again or email me directly.',
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      skills: 'Kỹ năng',
      projects: 'Dự án',
      achievements: 'Thành tích',
      contact: 'Liên hệ',
    },
    hero: {
      greeting: 'Xin chào, tôi là Nguyễn Trí Phong',
      role: 'Lập trình viên Full-Stack | Đam mê AI & Lãnh đạo Cộng đồng Esports',
      description: 'Mới tốt nghiệp ngành Kỹ thuật Phần mềm tại IUH. Đam mê xây dựng các ứng dụng full-stack sáng tạo với tích hợp AI. Từ phát triển hệ thống gợi ý ngành học thông minh sử dụng Python, React, Node.js, TensorFlow, và MongoDB, đến thực hiện kiểm thử tự động với MESHA trong kỳ thực tập 3 tháng tại FSoft, tôi kết hợp frontend, backend, và AI để tạo ra các giải pháp có tác động. Tôi tận dụng các công cụ AI như Cursor, ChatGPT, Gemini, và Grok để tăng tốc phát triển – từ tạo ý tưởng code và debug đến tối ưu hóa quy trình trong các dự án và bài tập.',
      viewProjects: 'Xem dự án',
      downloadResume: 'Tải CV',
    },
    about: {
      title: 'Giới thiệu',
      titleHighlight: 'bản thân',
      subtitle: 'Hành trình của tôi từ Kỹ thuật Phần mềm IUH đến phát triển AI và lãnh đạo esports.',
      myJourney: 'Hành trình của tôi',
      para1: 'Hành trình công nghệ của tôi bắt đầu tại IUH ngành Kỹ thuật Phần mềm, nơi tôi xây dựng các dự án full-stack như hệ thống tuyển sinh thông minh sử dụng Python, React, Node.js, TensorFlow và MongoDB – đề xuất lộ trình học tập với độ chính xác cao.',
      para2: 'Tôi tích hợp các công cụ AI như Cursor để tạo code, ChatGPT/Gemini để debug, và Grok để nghiên cứu – tăng tốc quy trình làm việc lên đến 30% trong thực tập FSoft và các dự án.',
      para3: 'Đam mê esports, tôi lãnh đạo cộng đồng Liên Quân Mobile tại IUH, tổ chức sự kiện cho hơn 500 thành viên – rèn luyện khả năng lãnh đạo và làm việc nhóm, được củng cố thêm bởi niềm yêu thích bóng đá.',
      highlight1: 'Tốt nghiệp IUH với nền tảng vững chắc về Kỹ thuật Phần mềm',
      highlight2: 'Thực tập tại FSoft, thực hiện kiểm thử tự động với MESHA và quản lý task qua Azure DevOps',
      highlight3: 'Xây dựng hệ thống đề xuất tuyển sinh thông minh sử dụng TensorFlow',
      highlight4: 'Lãnh đạo cộng đồng esports với hơn 500 thành viên Liên Quân Mobile',
      openToRoles: '💼 Hiện đang tìm kiếm vị trí lập trình viên full-stack tập trung vào AI/ML',
      codeComment: 'Hệ thống Tuyển sinh Thông minh',
    },
    skills: {
      title: 'Công nghệ',
      titleHighlight: 'sử dụng',
      subtitle: 'Các công nghệ và công cụ tôi đã sử dụng trong các dự án thực tế. Di chuột để xem chi tiết.',
      frontend: 'Frontend',
      backend: 'Backend',
      aiml: 'AI/ML',
      tools: 'Công cụ',
      softSkills: '🤝 Kỹ năng mềm',
      alwaysLearning: 'Luôn học hỏi và khám phá công nghệ mới',
      // Frontend
      react: 'React',
      reactDesc: 'Sử dụng trong Hệ thống Tuyển sinh AI, CheckIn IUH Frontend với giao diện hiện đại và Chart.js để hiển thị dữ liệu.',
      reactNative: 'React-Native',
      reactNativeDesc: 'Phát triển ứng dụng di động cho RecipeFoodApp (ứng dụng tìm công thức nấu ăn)',
      htmlCssJs: 'HTML/CSS/JS',
      htmlCssJsDesc: 'Bộ công cụ PCastPro broadcast overlay cho giải đấu esports',
      // Backend
      nodejs: 'Node.js',
      nodejsDesc: 'Sử dụng trong nhiều dự án với Express cho REST API và Socket.io cho tính năng real-time.',
      java: 'Java',
      javaDesc: 'Sử dụng trong Hệ thống Quản lý Lương PoLa với Swing GUI và SQL Server.',
      python: 'Python',
      pythonDesc: 'Backend cho hệ thống AI với Flask framework, TensorFlow/Keras và các thư viện xử lý dữ liệu.',
      databases: 'Cơ sở dữ liệu',
      databasesDesc: 'Kinh nghiệm với cả SQL (SQL Server) và NoSQL (MongoDB).',
      jwtAuth: 'JWT Auth',
      jwtAuthDesc: 'Triển khai xác thực bảo mật trong Hệ thống Tuyển sinh AI và CheckIn IUH.',
      // AI/ML
      tensorflow: 'TensorFlow/Keras',
      tensorflowDesc: 'Xây dựng mô hình deep learning cho Hệ thống Tuyển sinh AI (độ chính xác 70%).',
      sklearn: 'Scikit-learn',
      sklearnDesc: 'Áp dụng các thuật toán machine learning cho phân tích và dự đoán dữ liệu.',
      numpy: 'NumPy/Pandas',
      numpyDesc: 'Thư viện cốt lõi để xử lý và phân tích dữ liệu trong các dự án AI.',
      // Tools
      git: 'Git/GitHub',
      gitDesc: 'Quản lý phiên bản trong tất cả các dự án cá nhân và nhóm.',
      aiAssisted: 'Lập trình với AI',
      aiAssistedDesc: 'Tận dụng các công cụ AI như Cursor và ChatGPT để tăng tốc phát triển, debug và nghiên cứu.',
      azure: 'Azure DevOps',
      azureDesc: 'Sử dụng trong thực tập FSoft để quản lý task và báo bug trong môi trường làm việc nhóm.',
      mesha: 'MESHA',
      meshaDesc: 'Công cụ kiểm thử tự động độc quyền của FSoft được sử dụng trong kỳ thực tập 3 tháng.',
      obs: 'OBS',
      obsDesc: 'Tích hợp cho broadcast overlay trong bộ công cụ PCastPro.',
      // Soft Skills
      leadership: 'Lãnh đạo',
      leadershipDesc: 'Lãnh đạo cộng đồng Liên Quân hơn 500 thành viên tại IUH',
      eventManagement: 'Quản lý sự kiện',
      eventManagementDesc: 'Tổ chức các giải đấu esports và sự kiện công nghệ',
      teamwork: 'Làm việc nhóm',
      teamworkDesc: 'Hợp tác trong các dự án nhóm như Recipe và thực tập FSoft',
      communication: 'Giao tiếp',
      communicationDesc: 'Trình bày các khái niệm kỹ thuật trong sự kiện cộng đồng và dự án',
    },
    projects: {
      title: 'Dự án',
      titleHighlight: 'tiêu biểu',
      subtitle: 'Những dự án gần đây của tôi bao gồm phát triển full-stack, AI/ML và ứng dụng tập trung vào cộng đồng.',
      viewAllGithub: 'Xem tất cả dự án trên GitHub',
      frontend: 'Frontend',
      backend: 'Backend',
      code: 'Mã nguồn',
      demo: 'Demo',
      details: 'Chi tiết',
      // Project titles and descriptions
      aiAdmissionTitle: 'Hệ thống Tuyển sinh Thông minh AI',
      aiAdmissionDesc: 'Hệ thống thông minh đề xuất lộ trình học tập tối ưu cho thí sinh đại học. Sử dụng mạng neural được huấn luyện trên dữ liệu tuyển sinh lịch sử, đạt độ chính xác 70% trong dự đoán.',
      pcastProTitle: 'PCastPro',
      pcastProDesc: 'Bộ công cụ broadcast overlay và pick/ban cho esports Liên Quân. Bao gồm bố cục scene, hình ảnh pick/ban và điều khiển show được tối ưu hóa cho giải đấu.',
      recipeFoodTitle: 'RecipeFoodApp',
      recipeFoodDesc: 'Ứng dụng React Native cho phép người dùng xem và tìm kiếm công thức nấu ăn trên thiết bị di động.',
      polaTitle: 'Hệ thống Quản lý Lương PoLa',
      polaDesc: 'Hệ thống quản lý lương cho xưởng may PoLa, hỗ trợ quản lý nhân viên hành chính và công nhân, theo dõi chấm công và tính lương. Bao gồm xuất báo cáo Excel và in phiếu lương cho công nhân theo giờ và theo sản phẩm.',
      iuhCheckinTitle: 'Hệ thống Check-In IUH',
      iuhCheckinDesc: 'Ứng dụng check-in full-stack cho IUH (Đại học Công nghiệp TP.HCM) với xác thực JWT, route được bảo vệ và hỗ trợ mã QR. Giao diện hiện đại với thiết kế gradient và responsive. Tài khoản test: username "admin", password "123".',
      iuhEsportsTitle: 'Lãnh đạo Cộng đồng Esports IUH',
      iuhEsportsDesc: 'Thành lập và quản lý cộng đồng Liên Quân Mobile cho IUH, phát triển lên hơn 700 thành viên. Tổ chức nhiều giải đấu thành công, được trao giải "Trưởng Ban tổ chức xuất sắc nhất".',
    },
    achievements: {
      title: 'Giải thưởng &',
      titleHighlight: 'Thành tích',
      subtitle: 'Ghi nhận sự cống hiến, chuyên môn và đóng góp của tôi trong cả dự án kỹ thuật và cộng đồng.',
      paperTitle: 'Công bố Bài báo Khoa học',
      paperDesc: 'Công bố nghiên cứu về "Xây dựng Hệ thống Đề xuất Ngành học Thông minh" tại hội nghị khoa học cấp trường.',
      certTitle: 'Bằng khen',
      certDesc: 'Được trao tặng vì những đóng góp đáng kể cho hoạt động cộng đồng với ứng dụng IUH Check-In.',
      leaderWinterTitle: 'Trưởng Ban tổ chức xuất sắc nhất',
      leaderWinterDesc: 'Được công nhận vì khả năng lãnh đạo xuất sắc trong tổ chức giải đấu esports. "Tứ phương đại chiến Đông 2025".',
      leaderSpringTitle: 'Trưởng Ban tổ chức xuất sắc nhất',
      leaderSpringDesc: 'Được công nhận vì khả năng lãnh đạo xuất sắc trong tổ chức giải đấu esports. "Tứ phương đại chiến Xuân 2025".',
      viewPaper: 'Xem bài báo',
      viewPost: 'Xem bài viết',
    },
    contact: {
      title: 'Hãy',
      titleHighlight: 'Kết nối',
      subtitle: 'Tôi luôn sẵn sàng thảo luận về các cơ hội mới, hợp tác hoặc đơn giản là trò chuyện về công nghệ và game!',
      name: 'Họ tên',
      namePlaceholder: 'Tên của bạn',
      email: 'Email',
      emailPlaceholder: 'email.cua.ban@example.com',
      message: 'Tin nhắn',
      messagePlaceholder: 'Hãy cho tôi biết về dự án hoặc cơ hội của bạn...',
      send: 'Gửi tin nhắn',
      sending: 'Đang gửi...',
      getInTouch: 'Liên hệ',
      getInTouchDesc: 'Hãy thoải mái liên hệ qua bất kỳ nền tảng nào. Tôi thường phản hồi trong vòng 24 giờ!',
      location: '📍 Thành phố Hồ Chí Minh, Việt Nam',
      available: '⏰ Sẵn sàng cho freelance & toàn thời gian',
      footer: '© 2025 Phong Nguyễn. Xây dựng với React, Tailwind CSS và Motion',
      footerSub: 'Thiết kế & Phát triển với 💙 cho sự đổi mới và esports',
      messageSent: 'Tin nhắn đã gửi! Tôi sẽ phản hồi bạn sớm.',
      messageFailed: 'Gửi tin nhắn thất bại. Vui lòng thử lại hoặc email trực tiếp cho tôi.',
    },
  },
};

