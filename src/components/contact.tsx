'use client';

import type React from 'react';

export default function Contact() {
  return (
    <div className="flex flex-col justify-center gap-2 h-full p-2 text-sm text-wrap">
      <p>
        <span className="underline">Phone number:</span> +55(11)94447-8200
      </p>
      <p>
        <span className="underline">Email:</span>{' '}
        <a href="mailto:sofiahernandes.dev@gmail.com">
          sofiahernandes.dev@gmail.com
        </a>
      </p>
      <p>
        <span className="underline">LinkedIn:</span>{' '}
        <a href="https://www.linkedin.com/in/sofiahernandes/">
          https://www.linkedin.com/in/sofiahernandes
        </a>
      </p>
      <p>
        <span className="underline">Instagram:</span>{' '}
        <a href="https://www.instagram.com/sofiabotechia/">
          https://www.instagram.com/sofiabotechia
        </a>
      </p>
      <p>
        <span className="underline">GitHub:</span>{' '}
        <a href="https://github.com/sofiahernandes">
          https://github.com/sofiahernandes
        </a>
      </p>
    </div>
  );
}
