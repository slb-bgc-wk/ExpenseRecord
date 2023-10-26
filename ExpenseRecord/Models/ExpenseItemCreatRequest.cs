namespace ExpenseRecord.Models
{
    public class ExpenseItemCreatRequest
    {
        public string Discription { get; set; } = string.Empty;

        public string Type {  get; set; } = string.Empty;

        public int Count { get; set; }


    }
}
