(window.webpackJsonp = window.webpackJsonp || []).push([
	[4],
	{
		'99Un': function (n, t, e) {
			'use strict';
			e.r(t),
				e.d(t, 'HomeModule', function () {
					return u;
				});
			var o = e('ofXK'),
				r = e('tyNb'),
				s = e('fXoL');
			const c = [
				{
					path: '',
					component: (() => {
						class n {}
						return (
							(n.ɵfac = function (t) {
								return new (t || n)();
							}),
							(n.ɵcmp = s.xb({
								type: n,
								selectors: [['app-home']],
								decls: 2,
								vars: 0,
								template: function (n, t) {
									1 & n &&
										(s.Gb(0, 'p'),
										s.Qb(1, 'home works!'),
										s.Fb());
								},
								styles: ['']
							})),
							n
						);
					})()
				}
			];
			let p = (() => {
					class n {}
					return (
						(n.ɵfac = function (t) {
							return new (t || n)();
						}),
						(n.ɵmod = s.Bb({ type: n })),
						(n.ɵinj = s.Ab({ imports: [[r.a.forChild(c)], r.a] })),
						n
					);
				})(),
				u = (() => {
					class n {}
					return (
						(n.ɵfac = function (t) {
							return new (t || n)();
						}),
						(n.ɵmod = s.Bb({ type: n })),
						(n.ɵinj = s.Ab({ imports: [[o.b, p]] })),
						n
					);
				})();
		}
	}
]);
