import Script from 'next/script';

export default function UmamiAnalytics() {
  return (
    <Script
      defer
      src="https://umami.metro2039.ru/script.js"
      data-website-id="27b689e5-9aee-4ec0-8b0c-ec01d31fd5d1"
    />
  );
}
