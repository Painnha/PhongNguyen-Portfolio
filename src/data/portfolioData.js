export const portfolioData = {
    en: {
        personal: {
            name: "Phong Tri Nguyen",
            title: "Fresher Web Developer | Esports Broadcast Tooling",
            email: "work@nguyentriphong.id.vn",
            linkedin: "https://linkedin.com/in/phongnguyentri",
            github: "https://github.com/Painnha",
            avatar: "/avatar.png",
            bio: "I build web tools for OBS overlays, esports tournament production, and real-time broadcast workflows. Combining my Software Engineering background with hands-on esports production experience, I specialize in bridging the gap between automated software solutions and live broadcasting environments."
        },
        cvLinks: {
            en: "/CV_WebDev_NguyenTriPhong.pdf",
            vi: "/CV_WebDev_NguyenTriPhong_Vi.pdf"
        },
        skills: {
            frontend: ["React", "React Native", "Tailwind CSS", "HTML5/CSS3", "JavaScript"],
            backend: ["Node.js", "Express.js", "MongoDB", "SQL Server", "JWT"],
            realtime: ["Socket.io", "WebSocket", "OBS WebSocket"],
            testing: ["Selenium", "MESHA", "Postman", "Azure DevOps", "Manual/Automation Testing"],
            broadcast: ["OBS Studio", "vMix", "NDI/SRT", "VDO.Ninja", "ZeroTier"]
        },
        featuredProject: {
            name: "PCastPro - Esports Broadcast Overlay & OBS Control Tool",
            type: "Commercial Product",
            revenue: "Active Paying Users",
            thumbnailUrl: "/pcastpro-thumb.png",
            description: "A commercial real-time broadcast control system used by esports operators. Replaces manual OBS operations with a web-based dashboard for instant ban/pick overlays, scoreboard synchronization, and theme management.",
            metrics: [
                "Successfully commercialized product with an active paying user base, demonstrating strong market validation in the semi-pro esports community.",
                "Real-time synchronization using WebSocket with near-zero latency.",
                "Integrates OBS WebSocket to control scenes/sources directly from a web dashboard.",
                "Local-first architecture ensuring maximum stability during live broadcasts."
            ],
            tech: ["Node.js", "React", "Socket.io", "OBS API", "MongoDB"],
            videoUrl: "https://www.youtube.com/embed/--rLZCz46pg",
            githubUrl: "https://github.com/Painnha/pcastpro-broadcast-tool.git",
            liveUrl: ""
        },
        otherProjects: [
            {
                name: "AI University Admission Consulting System",
                description: "Full-stack system using neural networks trained on ~0.5GB real-world data to recommend suitable majors.",
                tech: ["React", "Python", "TensorFlow", "Keras", "MongoDB"],
                image: "/MajorRecommendationTitleImage.png",
                githubUrl: "https://github.com/Painnha/TuyenSinhThongMinh-monorepo",
                videoUrl: "https://drive.google.com/file/d/1ZQFp54YsRSVnVXEBYxTQVkNWGEFUj_lu/view?usp=drive_link",
                liveUrl: ""
            },
            {
                name: "IUH Event Check-in System",
                description: "Full-stack web app for real-time student event attendance using QR codes. Supported 100+ concurrent users.",
                tech: ["React", "Node.js", "Socket.io", "JWT"],
                image: "/Check-in-app.png",
                githubUrl: "https://github.com/Painnha/CheckIn_IUH_Frontend",
                videoUrl: "",
                liveUrl: "https://checkin-iuh.netlify.app/home"
            },
            {
                name: "Recipe Food Mobile App",
                description: "Cross-platform mobile application built with React Native for discovering, searching, and saving culinary recipes.",
                tech: ["React Native", "Expo", "JavaScript"],
                image: "/RecipeFoodAppTitle.png",
                githubUrl: "https://github.com/ThanhHiep25/LTTDD-Reactnative",
                videoUrl: "",
                liveUrl: ""
            },
            {
                name: "Pola - Employee Attendance & Payroll",
                description: "Desktop application for attendance tracking and payroll calculation with robust enterprise-grade SQL Server reporting.",
                tech: ["Java Swing", "SQL Server", "JasperReports"],
                image: "/EmployeeManagerSystem.png",
                githubUrl: "https://github.com/Painnha/employee-attendance-payroll-system",
                videoUrl: "",
                liveUrl: ""
            },
            {
                name: "IUH Esports Broadcast & Community",
                description: "Esports community hub and tournament management platform, organizing large-scale competitive gaming events and broadcasts.",
                tech: ["Community Management", "Social Media", "Event Planning"],
                image: "/Fanpage.png",
                githubUrl: "",
                videoUrl: "",
                liveUrl: "https://www.facebook.com/lqmiuh"
            }
        ],
        experience: [
            {
                role: "Automation Testing Intern",
                company: "FPT Software",
                duration: "Aug 2024 - Nov 2024",
                details: [
                    "Conducted automation testing for web applications using MESHA and Selenium.",
                    "Managed full bug lifecycle on Azure DevOps in an Agile/Scrum environment.",
                    "Designed and executed test cases for functional, UI/UX, and regression testing."
                ]
            },
            {
                role: "Broadcast Technician",
                company: "VPStudio",
                duration: "Apr 2026 - May 2026",
                details: [
                    "Operated live Replay systems for professional tournaments including Valorant Challengers SEA and Queen of Glory (QOG).",
                    "Deployed and installed SDI signal infrastructure and network systems for studio and on-site projects.",
                    "Handled on-site technical operations, live troubleshooting, and LED PC management for Watch Party events."
                ]
            },
            {
                role: "Broadcast Tech & Community Leader",
                company: "IUH Esports",
                duration: "2024 - Present",
                details: [
                    "Led tech-check and broadcast operations for FIT Arena 2025 and Tứ Phương Đại Chiến (350+ participants).",
                    "Configured NDI/SRT workflows, ZeroTier virtual LANs, and VDO.Ninja routing for low-latency point-to-point remote production."
                ]
            }
        ],
        achievements: [
            {
                title: "Faculty-Level Scientific Paper",
                description: "Co-authored research on \"Building a Major Recommendation System using Neural Networks\".",
                year: "2025",
                link: "https://vipro.dev/paper/conf/article/view/64",
                image: "/baibaokhoahoc.png"
            },
            {
                title: "Certificate of Merit",
                description: "Awarded by the Ward's Party Committee for outstanding contributions to Youth Union activities.",
                year: "2025",
                image: "/bangkhen.png"
            },
            {
                title: "Best Community Leader — Winter 2025",
                description: "Recognized for outstanding leadership in organizing esports tournaments.",
                year: "2025",
                link: "https://www.facebook.com/share/p/182FchYLqv/"
            },
            {
                title: "Best Community Leader — Spring 2025",
                description: "Recognized for outstanding leadership in organizing esports tournaments.",
                year: "2025",
                link: "https://www.facebook.com/share/p/1Bqa9gb1Xc/"
            }
        ],
        navigation: {
            about: "About",
            projects: "Projects",
            experience: "Experience",
            skills: "Skills",
            contact: "Contact",
            builtWith: "Built with",
            rightsReserved: "All rights reserved."
        },
        contact: {
            title: "Get in",
            titleHighlight: "Touch",
            subtitle: "Got a question, job opportunity, or project idea? Drop me a message and I'll respond as soon as possible.",
            name: "Your Name",
            namePlaceholder: "John Doe",
            email: "Email Address",
            emailPlaceholder: "johndoe@example.com",
            message: "Your Message",
            messagePlaceholder: "Hi Phong, I'd like to talk about...",
            sending: "Sending...",
            send: "Send Message",
            getInTouch: "Social Connections",
            getInTouchDesc: "Feel free to connect with me on these platforms or drop an email directly.",
            location: "Location: Ho Chi Minh City, Vietnam",
            available: "Available for freelance or full-time roles",
            footer: "Nguyễn Trí Phong | Web Developer & Esports Broadcast Tooling",
            footerSub: "Designed and built with passion.",
            messageSent: "Message sent successfully!",
            messageFailed: "Failed to send message."
        }
    },
    vi: {
        personal: {
            name: "Nguyễn Trí Phong",
            title: "Fresher Web Developer | Công cụ hỗ trợ phát sóng Esports",
            email: "work@nguyentriphong.id.vn",
            linkedin: "https://linkedin.com/in/phongnguyentri",
            github: "https://github.com/Painnha",
            avatar: "/avatar.png",
            bio: "Tôi xây dựng các công cụ web hỗ trợ OBS overlay, vận hành giải đấu Esports và quy trình phát sóng thời gian thực. Kết hợp nền tảng Công nghệ phần mềm với kinh nghiệm sản xuất Esports thực tế, tôi chuyên tối ưu hóa khoảng cách giữa giải pháp phần mềm tự động và môi trường phát sóng trực tiếp."
        },
        cvLinks: {
            en: "/CV_WebDev_NguyenTriPhong.pdf",
            vi: "/CV_WebDev_NguyenTriPhong_Vi.pdf"
        },
        skills: {
            frontend: ["React", "React Native", "Tailwind CSS", "HTML5/CSS3", "JavaScript"],
            backend: ["Node.js", "Express.js", "MongoDB", "SQL Server", "JWT"],
            realtime: ["Socket.io", "WebSocket", "OBS WebSocket"],
            testing: ["Selenium", "MESHA", "Postman", "Azure DevOps", "Kiểm thử Thủ công/Tự động"],
            broadcast: ["OBS Studio", "vMix", "NDI/SRT", "VDO.Ninja", "ZeroTier"]
        },
        featuredProject: {
            name: "PCastPro - Công cụ Điều khiển OBS & Overlay Phát sóng Esports",
            type: "Sản phẩm thương mại",
            revenue: "Người dùng trả phí thực tế",
            thumbnailUrl: "/pcastpro-thumb.png",
            description: "Hệ thống điều khiển phát sóng thời gian thực được thương mại hóa, sử dụng bởi các nhà vận hành giải đấu Esports. Thay thế thao tác OBS thủ công bằng bảng điều khiển web để cập nhật overlay ban/pick lập tức, đồng bộ tỷ số và quản lý chủ đề.",
            metrics: [
                "Sản phẩm đã được thương mại hóa thành công với tệp người dùng trả phí thực tế, chứng minh tính ứng dụng và giải quyết tốt bài toán của cộng đồng esports bán chuyên.",
                "Đồng bộ hóa thời gian thực sử dụng WebSocket với độ trễ gần như bằng không.",
                "Tích hợp OBS WebSocket để điều khiển trực tiếp các scene/source từ bảng điều khiển web.",
                "Kiến trúc local-first đảm bảo tính ổn định tối đa trong suốt thời gian phát sóng trực tiếp."
            ],
            tech: ["Node.js", "React", "Socket.io", "OBS API", "MongoDB"],
            videoUrl: "https://www.youtube.com/embed/--rLZCz46pg",
            githubUrl: "https://github.com/Painnha/PCastPro",
            liveUrl: ""
        },
        otherProjects: [
            {
                name: "Hệ thống Tư vấn Tuyển sinh Đại học sử dụng AI",
                description: "Hệ thống full-stack sử dụng mạng nơ-ron nhân tạo huấn luyện trên ~0.5GB dữ liệu thực tế để gợi ý ngành học phù hợp.",
                tech: ["React", "Python", "TensorFlow", "Keras", "MongoDB"],
                image: "/MajorRecommendationTitleImage.png",
                githubUrl: "https://github.com/Painnha/TuyenSinhThongMinh-monorepo",
                videoUrl: "https://drive.google.com/file/d/1ZQFp54YsRSVnVXEBYxTQVkNWGEFUj_lu/view?usp=drive_link",
                liveUrl: ""
            },
            {
                name: "Hệ thống Điểm danh Sự kiện IUH",
                description: "Ứng dụng web full-stack để điểm danh sinh viên tham gia sự kiện thời gian thực bằng mã QR. Hỗ trợ hơn 100 người dùng đồng thời.",
                tech: ["React", "Node.js", "Socket.io", "JWT"],
                image: "/Check-in-app.png",
                githubUrl: "https://github.com/Painnha/CheckIn_IUH_Frontend",
                videoUrl: "",
                liveUrl: "https://checkin-iuh.netlify.app/home"
            },
            {
                name: "Ứng dụng tìm kiếm công thức món ăn",
                description: "Ứng dụng di động đa nền tảng được phát triển bằng React Native hỗ trợ tìm kiếm, khám phá và lưu trữ các công thức nấu ăn ngon.",
                tech: ["React Native", "Expo", "JavaScript"],
                image: "/RecipeFoodAppTitle.png",
                githubUrl: "https://github.com/ThanhHiep25/LTTDD-Reactnative",
                videoUrl: "",
                liveUrl: ""
            },
            {
                name: "Pola - Quản lý Điểm danh & Tính lương Nhân viên",
                description: "Ứng dụng desktop theo dõi điểm danh và tính toán lương với hệ thống báo cáo SQL Server chuẩn doanh nghiệp.",
                tech: ["Java Swing", "SQL Server", "JasperReports"],
                image: "/EmployeeManagerSystem.png",
                githubUrl: "https://github.com/Painnha/employee-attendance-payroll-system",
                videoUrl: "",
                liveUrl: ""
            },
            {
                name: "IUH Esports Broadcast & Cộng đồng",
                description: "Trang cộng đồng và quản lý tổ chức sự kiện Esports, điều hành các giải đấu thể thao điện tử quy mô lớn và phát sóng.",
                tech: ["Quản lý Cộng đồng", "Social Media", "Lập kế hoạch Sự kiện"],
                image: "/Fanpage.png",
                githubUrl: "",
                videoUrl: "",
                liveUrl: "https://www.facebook.com/lqmiuh"
            }
        ],
        experience: [
            {
                role: "Thực tập sinh Kiểm thử Tự động",
                company: "FPT Software",
                duration: "Tháng 8/2024 - Tháng 11/2024",
                details: [
                    "Thực hiện kiểm thử tự động cho các ứng dụng web bằng MESHA và Selenium.",
                    "Quản lý toàn bộ vòng đời của lỗi trên Azure DevOps trong môi trường Agile/Scrum.",
                    "Thiết kế và thực thi các ca kiểm thử (test case) cho kiểm thử chức năng, UI/UX và hồi quy."
                ]
            },
            {
                role: "Kỹ thuật viên Phát sóng (Broadcast Technician)",
                company: "VPStudio",
                duration: "Tháng 4/2026 - Tháng 5/2026",
                details: [
                    "Vận hành hệ thống Replay trực tiếp cho các giải đấu chuyên nghiệp: Valorant Challengers SEA, Queen of Glory (QOG) và vận hành PC Led cho sự kiện Watch Party.",
                    "Triển khai, lắp đặt hạ tầng tín hiệu SDI và hệ thống mạng cho các dự án tại Studio và hiện trường.",
                    "Trực máy vận hành kỹ thuật, xử lý sự cố tín hiệu (troubleshooting) và hỗ trợ setup thiết bị livestream."
                ]
            },
            {
                role: "Trưởng ban Kỹ thuật Phát sóng & Cộng đồng",
                company: "IUH Esports",
                duration: "2024 - Hiện tại",
                details: [
                    "Chỉ đạo kỹ thuật và vận hành phát sóng cho FIT Arena 2025 và Tứ Phương Đại Chiến (hơn 350 người tham gia).",
                    "Cấu hình luồng truyền tải NDI/SRT, mạng LAN ảo ZeroTier và định tuyến VDO.Ninja cho sản xuất từ xa điểm-đến-điểm độ trễ thấp."
                ]
            }
        ],
        achievements: [
            {
                title: "Bài báo khoa học cấp Khoa",
                description: "Nghiên cứu & xây dựng hệ thống tư vấn tuyển sinh bằng mạng nơ-ron.",
                year: "2025",
                link: "https://vipro.dev/paper/conf/article/view/64",
                image: "/baibaokhoahoc.png"
            },
            {
                title: "Bằng khen Đảng bộ Phường",
                description: "Đóng góp app check-in cho Đại hội Đại biểu và công tác Đoàn.",
                year: "2025",
                image: "/bangkhen.png"
            },
            {
                title: "Trưởng BTC xuất sắc nhất — Đông 2025",
                description: "Được công nhận vì lãnh đạo xuất sắc trong tổ chức giải đấu esports.",
                year: "2025",
                link: "https://www.facebook.com/share/p/182FchYLqv/"
            },
            {
                title: "Trưởng BTC xuất sắc nhất — Xuân 2025",
                description: "Được công nhận vì lãnh đạo xuất sắc trong tổ chức giải đấu esports.",
                year: "2025",
                link: "https://www.facebook.com/share/p/1Bqa9gb1Xc/"
            }
        ],
        navigation: {
            about: "Giới thiệu",
            projects: "Dự án",
            experience: "Kinh nghiệm",
            skills: "Kỹ năng",
            contact: "Liên hệ",
            builtWith: "Xây dựng bằng",
            rightsReserved: "Bản quyền đã được bảo lưu."
        },
        contact: {
            title: "Liên hệ",
            titleHighlight: "với tôi",
            subtitle: "Có câu hỏi, cơ hội hợp tác hoặc ý tưởng dự án? Hãy gửi lời nhắn và tôi sẽ phản hồi sớm nhất có thể.",
            name: "Tên của bạn",
            namePlaceholder: "Nguyễn Văn A",
            email: "Địa chỉ Email",
            emailPlaceholder: "nguyenvana@example.com",
            message: "Lời nhắn của bạn",
            messagePlaceholder: "Chào Phong, tôi muốn thảo luận về...",
            sending: "Đang gửi...",
            send: "Gửi lời nhắn",
            getInTouch: "Kết nối xã hội",
            getInTouchDesc: "Liên kết với tôi qua các nền tảng mạng xã hội hoặc gửi email trực tiếp.",
            location: "Vị trí: Thành phố Hồ Chí Minh, Việt Nam",
            available: "Sẵn sàng cho các dự án tự do hoặc công việc toàn thời gian",
            footer: "Nguyễn Trí Phong | Web Developer & Esports Broadcast Tooling",
            footerSub: "Thiết kế và phát triển với sự tận tâm.",
            messageSent: "Gửi tin nhắn thành công!",
            messageFailed: "Gửi tin nhắn thất bại."
        }
    }
};