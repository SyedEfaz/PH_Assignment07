import Link from 'next/link'

export default function NotFound() {


  
  return <main className="not-found"><span>404</span><h1>পৃষ্ঠাটি পাওয়া যায়নি</h1><p>আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই বা সরানো হয়েছে।</p><Link className="primary-button" href="/">হোম পেজে ফিরে যান <span>→</span></Link></main>
}
