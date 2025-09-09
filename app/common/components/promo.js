import { html } from "#common/utils/mark-template.js";

export function renderPromo(main = "", addition = "") {
	return html`
		<main class="promo">
			<nav>
				<a class="promo__link" href="https://github.com/efiand">Портфолио</a>
			</nav>
			<h1 class="_visually-hidden">Сайт веб-разработчика Андрея Ефимова</h1>
			<div class="promo__lead">
				<p class="promo__text">
					${main}
					${addition ? html`<span class="promo__addition">${addition}</span>` : ""}
				</p>
			</div>
			<svg
				class="promo__image"
				width="429"
				height="392"
				viewBox="0 0 429 392"
				role="img"
				aria-label="Аватар разработчика, изготовленный собственноручно из кругов и овалов."
			>
				<defs>
					<linearGradient id="face">
						<stop stop-color="#d5a895" offset="0%" />
						<stop stop-color="#e8baab" offset="50%" />
						<stop stop-color="#d5a895" offset="100%" />
					</linearGradient>
					<linearGradient id="hair">
						<stop stop-color="#544749" offset="0%" />
						<stop stop-color="#605052" offset="30%" />
						<stop stop-color="#605052" offset="70%" />
						<stop stop-color="#544749" offset="100%" />
					</linearGradient>
					<radialGradient id="coat">
						<stop stop-color="#d9d048" offset="0%" />
						<stop stop-color="#b9c038" offset="100%" />
					</radialGradient>
				</defs>
				<path
					fill="url(#face)"
					d="M214 269c-35 0-67 9-91 25 22 30 54 49 91 49s69-19 91-49c-24-16-56-25-91-25z"
				/>
				<ellipse fill="url(#face)" cx="214" cy="239" rx="81" ry="129" />
				<ellipse fill="url(#face)" cx="214" cy="166" rx="102" ry="129" />
				<path
					fill="url(#coat)"
					d="M313 300l-8-6c-22 30-55 49-91 49s-69-19-91-49l-8 6C58 314 9 361 0 392h429c-9-31-60-78-116-92z"
				/>
				<path
					fill="url(#hair)"
					d="M332 123C332 55 279 0 214 0S96 55 96 123c0 27 5 51 19 71-1-7 1-57 1-57 9-14 36-62 44-71a288 288 0 0 0 108 0c7 9 35 57 44 71 0 0 2 50 1 57 14-20 19-44 19-71z"
				/>
				<path
					fill="url(#hair)"
					d="M171 144c10 0 20 1 28 3-4-6-15-10-28-10s-23 4-28 10c9-2 18-3 28-3zm86 0c10 0 19 1 28 3-5-6-16-10-28-10s-24 4-28 10c8-2 18-3 28-3zm-28 71a39 39 0 0 1-30 0c-26 6-47 26-50 51 18 18 40 29 65 29s47-11 65-29c-4-25-24-45-50-51z"
				/>
				<path
					fill="#efefef"
					d="M257 151c-9 0-17 2-23 7 6 5 14 8 23 8s16-3 22-8c-6-5-14-7-22-7z"
				/>
				<path
					fill="#efefef"
					d="M171 151c9 0 17 2 22 7-5 5-13 8-22 8s-16-3-22-8c6-5 13-7 22-7z"
				/>
				<ellipse fill="#ad887b" cx="204" cy="209" rx="4" ry="2" />
				<ellipse fill="#ad887b" cx="223" cy="209" rx="4" ry="2" />
				<circle fill="#7d7f79" cx="257" cy="158" r="7" />
				<circle fill="#3c3233" cx="257" cy="158" r="3" />
				<circle fill="#7d7f79" cx="171" cy="158" r="7" />
				<circle fill="#3c3233" cx="171" cy="158" r="3" />
				<path
					fill="#ffffff"
					d="M170 157l1-1h-2l1 1zm44 85c-10 0-20-2-27-4v1c0 9 12 17 27 17s27-8 27-17v-1c-8 2-17 4-27 4z"
				/>
				<path fill="#ffffff" d="M256 157v-1h-1l1 1z" />
			</svg>
		</main>
	`;
}
