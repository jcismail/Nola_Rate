const serviceAreas = [
  { abbreviation: "TX", name: "Texas" },
  { abbreviation: "LA", name: "Louisiana" },
  { abbreviation: "MS", name: "Mississippi" },
];

export default function ServiceAreaMap() {
  return (
    <div
      className="mt-6 rounded-2xl border border-[#f4d36a]/45 bg-white/8 p-4"
      aria-label="Service areas: Louisiana, Mississippi, and Texas"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffd534]">
            Service Areas
          </p>
          <p className="mt-1 text-sm text-white/75">Based in New Orleans</p>
        </div>
        <svg
          viewBox="0 0 290 170"
          role="img"
          aria-label="Map highlighting Texas, Louisiana, and Mississippi"
          className="h-28 w-56 max-w-[58%]"
        >
          <path
            d="M10.2 71.9L16.7 78.6L19.9 79.9L28 87.3L34.8 90.9L35.8 94L38 96.6L38.5 101L40.4 104.4L47.4 109.4L51.3 110.4L58.6 114.4L60.9 114.4L64.6 110.7L65.5 106.6L67.4 103.5L71.5 103.1L72.9 101.5L75.5 102.7L83.6 102.7L85.9 103.5L88 106.6L90.8 107.5L96.4 112.7L97.1 115.6L100.5 120.3L102.3 125.1L107.2 129.1L108.5 131.9L113 134.8L113.7 137.2L113 138.7L114.3 139.9L114.2 142.8L116.8 145.5L119.5 151.9L123.5 152.3L125.7 154.3L128.8 154.8L132.4 156.9L140.4 157.6L143.6 160L147.6 158.1L144.2 142.3L145.4 137L149.7 130L159.5 122.5L173.2 116.1L182.7 109.4L183.5 107.9L192.4 104.4L195.6 104.2L194.2 102.5L197.5 98.9L197.5 95.7L196.7 94.9L197.5 93.4L197.1 91.8L200 86.3L200 82.5L199 82.5L197.2 77.9L195.6 76.7L196.1 75L195.3 73.5L192.6 70.8L192.6 48.2L187.6 48L175.4 42.2L173.6 43.6L170 42.7L162 44.1L159 46.1L154.7 42.9L153.9 44.1L151.9 43.9L150.4 42.5L147.6 45.7L146.7 42.9L143.3 44.2L142.7 42.9L141.6 43.2L140 41.8L137.2 43.9L135.9 43.4L136 41.8L134 41.6L133.4 39.4L132.8 40L129.9 39.4L128.3 40.7L125.8 39.3L124.5 39.8L118 38.6L117.7 37.1L115.6 35.3L114.6 36.2L110.6 36.2L107.2 33.3L106.2 33.6L106.2 5.4L62.1 5.4L61.8 70.7L10.3 70.7Z"
            fill="#f4d36a"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M192.6 60.6L192.6 70.8L195.3 73.5L196.1 75L195.6 76.7L197.2 77.9L199 82.5L200 82.5L200 86.3L197.1 91.8L197.5 93.4L196.7 94.9L197.5 95.7L197.5 98.9L194.2 102.5L195.6 104.2L205.2 103L214 105.8L217.5 106.5L221.3 105.7L224.8 107.3L226.4 105.9L224.1 105.1L224.4 104L227 103.4L227.4 105L232.9 108.9L231.9 109.8L232.7 110.6L237.6 111.8L238.6 113.4L248 112.9L253.5 109.6L258.7 111.1L260.5 113.1L259.9 115.1L262 113.3L263.6 114.3L264.8 112.9L265.3 111.1L264 111L262.8 109.2L258 107.9L257 105.3L259.9 104.3L259.9 103L261.8 103.2L263.1 97.5L258.6 99.1L256.3 101.7L253.4 100.4L253.5 99.4L258.1 97.1L256.9 96.5L253.8 90.3L255.2 85.1L227.5 85.2L228.6 84.5L227.4 81.8L229.3 81L229.2 78L230.4 77.3L230 76.2L231 75.8L231.2 74.6L232.1 74.4L231.7 73L235.5 70.3L236.2 69.2L235.1 67.7L236.8 67.6L237.9 65.7L236.9 65.6L237.2 64.5L236 64.3L235.8 63.3L236.6 63.2L235.3 60.7L235.9 60.2L234.4 59.4L235.7 57.1L234.3 56.1L192.6 55.9Z"
            fill="#f4d36a"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M227.7 81.3L228.6 84.5L227.5 85.2L255.2 85.1L253.8 90.3L256.9 96.5L258.1 97.1L260.7 95.4L266.1 94L274.3 94.7L273.4 71.7L278.8 28.7L277.3 27.2L246.7 27.2L247.6 28.5L244.5 29.6L242.7 32.8L242.9 35.7L238.2 38.4L237.5 40.1L238.3 41.3L235.4 42.2L236.2 42.5L236.3 45.1L234.6 45.3L235.6 45.8L234.1 46.7L234.8 47.3L233.6 48.5L235.7 52.8L234.1 54.8L235 55.4L234.3 56.1L235.7 57.1L234.4 59.4L235.9 60.2L235.3 60.7L236.6 63.2L235.8 63.3L236 64.3L237.2 64.5L236.9 65.6L237.9 65.7L236.8 67.6L235.1 67.7L236.2 69.2L234.1 71.8L231.7 73L232.1 74.4L231.2 74.6L231 75.8L230 76.2L230.4 77.3L229.2 78L229.3 81Z"
            fill="#f4d36a"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text x="105" y="83" fill="#121e5b" fontSize="15" fontWeight="900">TX</text>
          <text x="207" y="80" fill="#121e5b" fontSize="13" fontWeight="900">LA</text>
          <text x="251" y="59" fill="#121e5b" fontSize="13" fontWeight="900">MS</text>
          <circle cx="250.2" cy="100.4" r="4" fill="#b52228" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-2" aria-label="Licensed service states">
        {serviceAreas.map((area) => (
          <li key={area.abbreviation} className="rounded-lg bg-white/10 px-2 py-2 text-center">
            <span className="block text-xs font-black text-white">{area.abbreviation}</span>
            <span className="block text-[10px] text-white/70">{area.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
