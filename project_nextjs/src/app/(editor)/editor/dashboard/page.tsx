'use client'

import Link from 'next/link'

// Mock data for editor dashboard
const mockStats = {
  totalSubmissions: 24,
  inReview: 8,
  inCopyediting: 4,
  inProduction: 3,
  publishedThisMonth: 6,
  avgReviewTime: 21,
  overdueReviews: 2,
  newSubmissionsThisWeek: 5
};

const mockRecentSubmissions = [
  {
    id: "1",
    title: "Pemanfaatan Machine Learning untuk Prediksi Cuaca di Daerah Tropis",
    author: "Dr. Andi Wijaya, M.Kom",
    stage: "review",
    status: "in-review",
    daysInStage: 15,
    priority: "normal",
    submittedDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Analisis Sentimen Terhadap Kebijakan Pemerintah Menggunakan Deep Learning",
    author: "Siti Nurhaliza, S.T., M.T.",
    stage: "copyediting",
    status: "submitted",
    daysInStage: 8,
    priority: "high",
    submittedDate: "2024-01-10"
  },
  {
    id: "3",
    title: "Perancangan Sistem Informasi Manajemen Perpustakaan Berbasis Web",
    author: "Bambang Suryadi, S.Kom., M.Kom.",
    stage: "production",
    status: "accepted",
    daysInStage: 5,
    priority: "normal",
    submittedDate: "2024-01-05"
  }
];

const mockTasks = [
  {
    id: "1",
    type: "review_assignment",
    title: "Assign reviewers for submission #1234",
    dueDate: "2024-01-25",
    priority: "high",
    submissionTitle: "Machine Learning Applications in Weather Prediction"
  },
  {
    id: "2",
    type: "review_reminder",
    title: "Send review reminder to Dr. Smith",
    dueDate: "2024-01-23",
    priority: "medium",
    submissionTitle: "Sentiment Analysis Using Deep Learning"
  },
  {
    id: "3",
    type: "editorial_decision",
    title: "Make editorial decision for submission #1235",
    dueDate: "2024-01-28",
    priority: "high",
    submissionTitle: "Web-Based Library Management System"
  }
];

export default function EditorDashboardPage() {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'review': return '#e08914'
      case 'copyediting': return '#006798'
      case 'production': return '#00b28d'
      default: return '#666'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      default: return '#6c757d'
    }
  }

  return (
    <div className="pkp_structure_page">
      {/* Breadcrumb */}
      <nav className="pkp_breadcrumb" style={{marginBottom: '1rem', fontSize: '0.875rem', color: '#666'}}>
        <a href="/" style={{color: '#006798', textDecoration: 'none'}}>Home</a>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <a href="/editor" style={{color: '#006798', textDecoration: 'none'}}>Editorial</a>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <span>Dashboard</span>
      </nav>

      {/* Page Title */}
      <div className="pkp_page_header" style={{marginBottom: '1.5rem'}}>
        <h1 className="pkp_page_title" style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#002C40'}}>
          Editor Dashboard
        </h1>
        <p className="pkp_page_description" style={{color: '#666', margin: 0, fontSize: '0.875rem'}}>
          Monitor submissions and manage editorial workflow
        </p>
      </div>

      {/* Statistics Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
            <h3 style={{fontSize: '0.875rem', fontWeight: 'normal', color: '#666', margin: 0}}>Total Submissions</h3>
          </div>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#002C40', marginBottom: '0.5rem'}}>{mockStats.totalSubmissions}</div>
          <p style={{fontSize: '0.75rem', color: '#666', margin: 0}}>
            +{mockStats.newSubmissionsThisWeek} this week
          </p>
        </div>

        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
            <h3 style={{fontSize: '0.875rem', fontWeight: 'normal', color: '#666', margin: 0}}>In Review</h3>
          </div>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#e08914', marginBottom: '0.5rem'}}>{mockStats.inReview}</div>
          <p style={{fontSize: '0.75rem', color: '#666', margin: 0}}>
            {mockStats.overdueReviews} overdue
          </p>
        </div>

        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
            <h3 style={{fontSize: '0.875rem', fontWeight: 'normal', color: '#666', margin: 0}}>In Copyediting</h3>
          </div>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#006798', marginBottom: '0.5rem'}}>{mockStats.inCopyediting}</div>
          <p style={{fontSize: '0.75rem', color: '#666', margin: 0}}>
            Ready for editing
          </p>
        </div>

        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
            <h3 style={{fontSize: '0.875rem', fontWeight: 'normal', color: '#666', margin: 0}}>Published This Month</h3>
          </div>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#00b28d', marginBottom: '0.5rem'}}>{mockStats.publishedThisMonth}</div>
          <p style={{fontSize: '0.75rem', color: '#666', margin: 0}}>
            Avg review: {mockStats.avgReviewTime} days
          </p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem'}}>
        {/* Recent Submissions */}
        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px'}}>
          <div style={{padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#002C40', margin: '0 0 0.25rem 0'}}>Recent Submissions</h2>
              <p style={{fontSize: '0.875rem', color: '#666', margin: 0}}>Latest submissions requiring attention</p>
            </div>
            <Link href="/editor/submissions" style={{backgroundColor: 'white', border: '1px solid #ddd', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#006798', textDecoration: 'none'}}>
              View All
            </Link>
          </div>
          <div style={{padding: '1rem'}}>
            {mockRecentSubmissions.map((submission) => (
              <div key={submission.id} style={{border: '1px solid #eee', borderRadius: '4px', padding: '1rem', marginBottom: '0.75rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                  <h4 style={{fontSize: '0.875rem', fontWeight: 'bold', color: '#002C40', margin: 0, flex: 1, marginRight: '0.5rem'}}>
                    {submission.title}
                  </h4>
                  <span style={{
                    backgroundColor: getPriorityColor(submission.priority),
                    color: 'white',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '3px',
                    fontSize: '0.625rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {submission.priority}
                  </span>
                </div>
                <p style={{fontSize: '0.75rem', color: '#666', margin: '0 0 0.5rem 0'}}>by {submission.author}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{
                      backgroundColor: getStageColor(submission.stage),
                      color: 'white',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '3px',
                      fontSize: '0.625rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {submission.stage}
                    </span>
                    <span style={{fontSize: '0.75rem', color: '#666'}}>
                      {submission.daysInStage} days in stage
                    </span>
                  </div>
                  <Link href={`/editor/submissions/${submission.id}`} style={{backgroundColor: 'white', border: '1px solid #ddd', padding: '0.125rem 0.375rem', fontSize: '0.625rem', color: '#006798', textDecoration: 'none'}}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Tasks */}
        <div style={{backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px'}}>
          <div style={{padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#002C40', margin: '0 0 0.25rem 0'}}>Editorial Tasks</h2>
              <p style={{fontSize: '0.875rem', color: '#666', margin: 0}}>Pending tasks requiring action</p>
            </div>
            <Link href="/editor/submissions" style={{backgroundColor: 'white', border: '1px solid #ddd', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#006798', textDecoration: 'none'}}>
              Assign
            </Link>
          </div>
          <div style={{padding: '1rem'}}>
            {mockTasks.map((task) => (
              <div key={task.id} style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', border: '1px solid #eee', borderRadius: '4px', marginBottom: '0.5rem'}}>
                <div style={{
                  padding: '0.25rem',
                  borderRadius: '50%',
                  backgroundColor: task.priority === 'high' ? '#f8d7da' : task.priority === 'medium' ? '#fff3cd' : '#e2e3e5',
                  color: task.priority === 'high' ? '#721c24' : task.priority === 'medium' ? '#856404' : '#383d41'
                }}>
                  <div style={{width: '0.75rem', height: '0.75rem', backgroundColor: 'currentColor', borderRadius: '50%'}}></div>
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '0.875rem', fontWeight: 'bold', color: '#002C40', margin: '0 0 0.25rem 0'}}>
                    {task.title}
                  </p>
                  <p style={{fontSize: '0.75rem', color: '#666', margin: '0 0 0.25rem 0'}}>
                    {task.submissionTitle}
                  </p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <span style={{fontSize: '0.75rem', color: '#666'}}>Due: {task.dueDate}</span>
                  </div>
                </div>
                <span style={{
                  backgroundColor: getPriorityColor(task.priority),
                  color: 'white',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '3px',
                  fontSize: '0.625rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

