"use client";

import { PageHeader } from "@/components/admin/page-header";

export default async function SettingsWorkflowPage() {
  return (
    <div className="pkp_structure_page">
      {/* Breadcrumb */}
      <nav className="pkp_breadcrumb" style={{marginBottom: '1rem', fontSize: '0.875rem', color: '#666'}}>
        <a href="/" style={{color: '#006798', textDecoration: 'none'}}>Home</a>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <a href="/editor" style={{color: '#006798', textDecoration: 'none'}}>Editorial</a>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <a href="/editor/settings" style={{color: '#006798', textDecoration: 'none'}}>Settings</a>
        <span style={{margin: '0 0.5rem'}}>/</span>
        <span>Workflow</span>
      </nav>

      {/* Page Title */}
      <div className="pkp_page_header" style={{marginBottom: '1.5rem'}}>
        <h1 className="pkp_page_title" style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#002C40'}}>
          Settings • Workflow
        </h1>
        <p className="pkp_page_description" style={{color: '#666', margin: 0, fontSize: '0.875rem'}}>
          Pengaturan workflow yang diizinkan untuk Editor.
        </p>
      </div>

      {/* Content */}
      <div className="pkp_content_panel" style={{backgroundColor: 'white', border: '1px solid #ddd', padding: '1.5rem'}}>
        <p className="text-sm text-gray-600">
          Placeholder Workflow Settings. Akan mencakup: opsi review, template email terkait review, dan pedoman submission.
        </p>
      </div>
      
      <style jsx>{`
        .pkp_structure_page {
          padding: 0;
        }
        .pkp_breadcrumb a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
