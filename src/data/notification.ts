export interface JobPost {
    image: string;
    title: string;
  }


export const notifications = [
    {
      id: 1,
      type: 'job',
      message: 'Customer service assistant: 2 opportunities in Illinois, United States',
      actionLabel: 'View jobs',
      actionLink: '#',
      time: '1h ago',
      icon: 'fa-briefcase',
      companyLogo: require("../images/logo/Untitled picture1.png"),
      companyName: 'ABC Corp',
      jobType: 'Full-Time',
      deadline: '2 days left',
    },
    {
      id: 2,
      type: 'birthday',
      message: 'Wish Shubham Kumar Mathur a happy birthday. View more opportunities to catch up with your network.',
      actionLabel: 'Say happy birthday',
      actionLink: '#',
      time: '3h ago',
      icon: 'fa-birthday-cake',
      companyLogo:require("../images/logo/Untitled picture1.png"),
      companyName: 'XYZ Pvt Ltd',
      jobType: 'Part-Time',
      deadline: '5 days left',
    },
    {
      id: 3,
      type: 'job',
      message: 'Assistant: 30+ opportunities in United States',
      actionLabel: 'View jobs',
      actionLink: '#',
      time: '3h ago',
      icon: 'fa-briefcase',
      companyLogo:require("../images/logo/Untitled picture1.png"),
      companyName: 'LMN Inc.',
      jobType: 'Contract',
      deadline: '1 day left',
    },
  ];