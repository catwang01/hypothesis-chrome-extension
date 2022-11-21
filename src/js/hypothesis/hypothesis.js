import queryString from "query-string";
// import fetch from "isomorphic-fetch";
import lodash from "lodash";
import { getRoamDate } from "./index.js";

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hash = (s) =>
{
  var hash = 0,
  i, chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const parseAnnotation = a => {
  const textRaw = a.text;
  const quotationRaw =
    lodash.get(a, "target[0]selector") &&
    a.target[0].selector.find(x => x.exact) &&
    a.target[0].selector.find(x => x.exact).exact;
  let result = "";
  const quotation = (quotationRaw || "").replace(/\n/g, " ");
  const text = (textRaw || "").replace(/\n/g, " ");
  const extraIndent = text ? "  " : "";
  const quoteString = quotation ? `    - ${quotation}` : "";
  const textString = text ? extraIndent + `    - ^^${text}^^` : "";
  return [quoteString, textString].join("\n");
};

const parseAnnotationMd = a => {
  const textRaw = a.text;
  const link = a.links['incontext']
  const quotationRaw =
    lodash.get(a, "target[0]selector") &&
    a.target[0].selector.find(x => x.exact) &&
    a.target[0].selector.find(x => x.exact).exact;
  console.log({ a })
  var div = document.createElement("div")
  // let result = "";
  const quotation = (quotationRaw || "").replace(/\n/g, " ");
  // const text = (textRaw || "").replace(/\n/g, " ");
  // const extraIndent = text ? "  " : "";
  // const quoteString = quotation ? `    - ${quotation}` : "";
  // const textString = text ? extraIndent + `    - ^^${text}^^` : "";
//   div.innerHTML = `
//   <div>
// > ${quotation} <br/>
// > <br/>
// > ${link} <br/>
//   </div>
// `
  // const quotationId = hash(quotation);
  const quotationId = a.id;
  div.innerHTML = `
<div>
${quotation} [^${quotationId}] <br/>
<br/>
[^${quotationId}]: [${link}](${link}) <br/>
</div>
`

  var button = document.createElement("button");
  button.textContent = "copy"
  button.onclick = function handleOnClick(e) { 
    var text = div.children[0].textContent
    navigator.clipboard.writeText(text)
    console.log(`write into clipboard: ${text}`)
  }
  div.appendChild(button)
  return div
};

const getAnnotations = async (token, annotatedUrl, user) => {
  const query = queryString.stringify({
    url: annotatedUrl,
    limit: 200,
    user
  });
  const url = "https://hypothes.is/api/search?" + query;
  const queryHeaders = token && {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  try {
    return await fetch(url, queryHeaders)
      .then(async e => {
        console.log(e);
        const json = await e.json();
        console.log(json)
        return json
      })
      .then(e => {

        if (!e.rows.length){
          return 'No annotations found'
        }
        const article = lodash.get(e, "rows[0].document.title[0]");
        const updated = lodash.get(e, "rows[0].updated");

        var outputDiv = document.createElement("div");

        var divs = lodash
          .orderBy(e.rows, f => {
            try {
              return lodash
                .get(f, "target[0].selector")
                .filter(x => x.type === "TextPositionSelector")[0].start;
            } catch (e) {
              return 0;
            }
          })
          .map(x => parseAnnotationMd(x))
        
        divs.forEach(div => outputDiv.appendChild(div))

        return outputDiv;


        // const annotations = lodash
        //   .orderBy(e.rows, f => {
        //     try {
        //       return lodash
        //         .get(f, "target[0].selector")
        //         .filter(x => x.type === "TextPositionSelector")[0].start;
        //     } catch (e) {
        //       return 0;
        //     }
        //   })
        //   .map(x => parseAnnotation(x))
        //   .join("\n");
        // const dateStr = getRoamDate(updated);
        // const bulletedAnnotations =
        // `- ${article}\n  - Source: ${annotatedUrl}\n${annotations}`
        // // console.log(bulletedAnnotations);
        // return bulletedAnnotations;
      });
  } catch (e) {
    console.error(e);
  }
};

export default (url, user, token)  => {
  return getAnnotations(token, url, user);
};