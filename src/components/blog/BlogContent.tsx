import React from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const sections = content.split('\n\n');

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {sections.map((section, index) => {
        // Handle bullet points
        if (section.includes('\n- ')) {
          const [title, ...bullets] = section.split('\n');
          return (
            <div key={index} className="mb-6">
              {title && <p className="text-gray-700 dark:text-gray-300 mb-2">{title}</p>}
              <ul className="list-disc pl-6 space-y-1">
                {bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{bullet.replace('- ', '')}</li>
                ))}
              </ul>
            </div>
          );
        }

        // Handle numbered sections
        if (/^\d+\./.test(section)) {
          const [title, ...content] = section.split('\n\n');
          return (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">{title}</h2>
              {content.map((para, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 mb-4">{para}</p>
              ))}
            </div>
          );
        }

        // Regular paragraphs
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
            {section}
          </p>
        );
      })}
    </div>
  );
}