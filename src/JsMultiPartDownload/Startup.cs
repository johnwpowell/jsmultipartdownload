using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(JsMultiPartDownload.Startup))]
namespace JsMultiPartDownload
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            WebAPIConfig.Register(config);

            app.UseWebApi(config);
        }
    }
}