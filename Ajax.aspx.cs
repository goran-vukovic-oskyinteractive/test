using System;
using System.Diagnostics;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;


public partial class Ajax : System.Web.UI.Page
{
    public class Data
    {
        int level = -1;

        public Data(int level)
        {
            // TODO: Complete member initialization
            Debug.WriteLine(level);
            this.level = level;
            if (level == 0 || level >= 4)
                throw new ApplicationException("invalid node level");

        }
        public int l
        {
            get
            {
                return level;
            }
        }
        public string color
        {
            get
            {
                return "red";
            }
        }
        public int alpha
        {
            get
            {
                return 1;
            }
        }

    }
    private class DistributionManagementNode
    {
        //Note: the notation is adjusted to AJAX, hence not corresponding to C# standard
        private int level;
        protected string tagId;
        protected int nodeId;
        protected int parentId;
        protected string nodeName;
        private List<DistributionManagementNode> childNodes;

        public DistributionManagementNode(int nodeId, string nodeName, int parentId)
        {
            this.nodeId = nodeId;
            this.nodeName = nodeName;
            this.parentId = parentId;
            this.childNodes = new List<DistributionManagementNode>();
        }
        public int GetId()
        {
            return nodeId;
        }
        public int GetParentId()
        {
            return parentId;
        }
        public void SetLevel(int level)
        {
            if (level == 0)
                Debug.WriteLine("aaaaaa");
            Debug.WriteLine(level);
            this.level = level;
        }
        public string id
        {
            get
            {
                return tagId;
            }
            set
            {
                tagId = value;
            }
        }
        public string name
        {
            get
            {
                return nodeName;
            }
        }

        public List<DistributionManagementNode> children
        {
            get
            {
                return childNodes;
            }
        }
        public Data data
        {
            get { return new Data(this.level); }
        }
    }
    private void BuildTree(IEnumerable<DistributionManagementNode> list, DistributionManagementNode parentNode)
    {
        var nodes = list.Where(x => x.GetParentId() == parentNode.GetId());
        foreach (var node in nodes)
        {
            node.id = parentNode.id + "_" + node.GetId();
            int level = node.id.Split('_').Length;
            Debug.WriteLine(node.id);
            Debug.WriteLine(level);
            if (level == 0)
                Debug.WriteLine("aaaaaa");
            node.SetLevel(level);
            parentNode.children.Add(node);
            BuildTree(list, node);            
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        string nodeId = Request.Params["i"].Substring(2);
        string[] ids = nodeId.Split('_');
        //the root id
        int rootId = Int32.Parse(ids[0]);
        //int id = Int32.Parse(ids[ids.Length - 1]);
        int action = Int32.Parse(Request.Params["a"]);
        
        //list.Add(new DistributionManagementNode(1, "Alice", 0));
        //list.Add(new DistributionManagementNode(2, "John", 1));
        //list.Add(new DistributionManagementNode(3, "Bob", 1));


        //SqlConnection conn = new SqlConnection("Data Source=VT-OSKY-WIN2003;Initial Catalog=DB_52806_mercury;Integrated Security=True");
        SqlConnection conn = new SqlConnection("Data Source=VTSQL2008DEV;Initial Catalog=DB_52806_mercury;Integrated Security=True");
        try
        {
            conn.Open();
            SqlCommand comm = new SqlCommand();
            comm.Connection = conn;
            comm.CommandType = System.Data.CommandType.StoredProcedure;
            switch (action)
            {
                case 0://get
                    break;
                case 1://add
                    //AddNode();
                    comm.CommandText = "addDistributionManagementNode";
                    int parentId = Int32.Parse(ids[ids.Length - 2]);
                    SqlParameter parParentId = new SqlParameter("@parentId", parentId);
                    comm.Parameters.Add(parParentId);
                    string nodeName = Request.Params["p1"];
                    SqlParameter parNodeName = new SqlParameter("@nodeName", nodeName);
                    comm.Parameters.Add(parNodeName);
                    comm.ExecuteNonQuery();
                    break;
                case 2://delete
                    //AddNode();
                    break;
                case 3://update
                    //AddNode();
                    break;
                default:
                    throw new ApplicationException("invalid action");
            }
            comm.CommandText = "get_distributionManagement";
            SqlParameter parId = new SqlParameter("@root", rootId);
            comm.Parameters.Clear();
            comm.Parameters.Add(parId);
            SqlDataReader rd = comm.ExecuteReader();
            List<DistributionManagementNode> list = new List<DistributionManagementNode>();
            while (rd.Read())
            {
                list.Add(new DistributionManagementNode((int) rd["NodeId"],(string) rd["NodeName"], (int) rd["NodeParentId"]));

            }
            rd.Close();
            DistributionManagementNode rootNode = list[0];
            rootNode.id = "dm" + rootId;
            rootNode.SetLevel(1);
            BuildTree(list, rootNode);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(rootNode);
            //DataContractJsonSerializer SerializableAttribute = new DataContractJsonSerializer (typeof(DistributionManagementNode));
            Response.ContentType = "application/json";
            Debug.Write(json);
            Response.Write(json);
            //Response.Headers.Add("application/json");
            //Response.Write("{ status: 'success' }");
        }
        catch (SqlException ex)
        {
            Debug.Write(ex.Message);

        }
        finally
        {
            if (conn != null)
                conn.Close();
        }
    }
}