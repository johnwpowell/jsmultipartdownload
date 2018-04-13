using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace JsMultiPartDownload.Controllers
{
    public class DownloadController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var multipartContent = new MultipartContent();

            var pdfDocument = new StreamContent(new FileStream(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Files/LoremIpsum.pdf"), FileMode.Open));
            pdfDocument.Headers.ContentType = MediaTypeHeaderValue.Parse("application/pdf");
            pdfDocument.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "LoremIpsum.pdf"
                };
            multipartContent.Add(pdfDocument);

            var wordDocument = new StreamContent(new FileStream(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Files/LoremIpsum.docx"), FileMode.Open));
            wordDocument.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "LoremIpsum.docx"
                };
            wordDocument.Headers.ContentType = MediaTypeHeaderValue.Parse("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            multipartContent.Add(wordDocument);

            var textDocument = new StreamContent(new FileStream(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Files/LoremIpsum.txt"), FileMode.Open));
            textDocument.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "LoremIpsum.txt"
                };
            textDocument.Headers.ContentType = MediaTypeHeaderValue.Parse("text/plain");
            multipartContent.Add(textDocument);

            return new HttpResponseMessage
            {
                Content = multipartContent
            };
        }

        public HttpResponseMessage Get(int id)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(new FileStream(System.Web.Hosting.HostingEnvironment.MapPath(@"~/Files/LoremIpsum.pdf"), FileMode.Open));
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LoremIpsumPDF.pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

            return response;
        }
    }
}