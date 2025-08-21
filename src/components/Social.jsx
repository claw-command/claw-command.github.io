import React, { useState } from 'react';

function Icon({ src, alt, fallback }) {
  const [ok, setOk] = useState(true);
  if (!ok) return fallback;
  return <img src={src} alt={alt} onError={() => setOk(false)} />;
}

export default function Social() {
  return (
    <div className="social-links">
      <a
        href="https://calstatela.co1.qualtrics.com/jfe/form/SV_54t7EYCRw7PEW8e"
        className="social-link"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Discord"
      >
        <Icon src="/icons/discord.png" alt="Discord" fallback={<span>Discord</span>} />
      </a>
      <a
        href="https://www.instagram.com/claw.command/"
        className="social-link"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Instagram"
      >
        <Icon src="/icons/instagram.png" alt="Instagram" fallback={<span>Instagram</span>} />
      </a>
    </div>
  );
}
