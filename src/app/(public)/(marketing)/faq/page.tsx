import PageHeader from '@/components/shared/PageHeader';

export const metadata = { title: 'FAQ | UniCore' };

const faqs = [
  {
    q: 'How do I apply as a student?',
    a: 'Register an account, then submit the student application with your department, batch and contact details. An admin reviews and approves it.',
  },
  {
    q: 'How do I apply as faculty?',
    a: 'Register an account, then submit the teacher application. You get faculty access once an admin approves it.',
  },
  {
    q: 'How do I pay my course fee?',
    a: 'Enroll in a course offering, then pay the fee through bKash from your payments page. Your enrollment is confirmed after the payment succeeds.',
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Admission & Academic FAQs" />
      <div className="space-y-3">
        {faqs.map(item => (
          <details key={item.q} className="rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">{item.q}</summary>
            <p className="text-muted-foreground mt-2 text-sm">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
