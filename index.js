const path = require("path");
const fs = require("hexo-fs");
const renderer = require("./renderer");

hexo.extend.filter.register('before_generate', function(){
  console.log("hexo-masonry");
});

const style = fs.readFileSync(path.resolve(__dirname, "./templates/assets/masonry.css"), { encoding: "utf8" });
const script = fs.readFileSync(path.resolve(__dirname, "./templates/assets/masonry.js"), { encoding: "utf8" });
const PIN_TEMPLATE = path.resolve(__dirname, "./templates/pin.html");

hexo.extend.injector.register(
    "head_end", () => {
        return `<style type="text/css">${style}</style>`;
    }, "post"
);

hexo.extend.injector.register(
    "head_end",
	`<script type="text/javascript">${script}</script>`,
    "post"
);

hexo.extend.tag.register("masonry", (args, content) => {
	 const title = args[0] ? args[0] : "",
			desc = args[1] ? args[1] : "";
	return new Promise((resolve, reject) => {
		renderer.render(PIN_TEMPLATE, { title, desc, content }, (err, res) => {
			if (err) {
				return reject(err);
			}
			resolve(res);
		});
	})
}, {ends: true,
	async: true,
});


