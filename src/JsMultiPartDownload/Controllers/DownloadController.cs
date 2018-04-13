using System.Collections.Generic;
using System.Web.Http;

namespace JsMultiPartDownload.Controllers
{
    public class DownloadController : ApiController
    {
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}