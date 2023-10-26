namespace ExpenseRecord.Models
{
    public class ExpenseItemDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Discription {  get; set; } = string.Empty;

        public string Type {  get; set; } = string.Empty;

        public int Count { get; set; }

        public string CreatedTime { get; set; } = string.Empty;
    }
}
