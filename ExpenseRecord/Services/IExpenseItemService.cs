using ExpenseRecord.Models;

namespace ExpenseRecord.Services
{
    public interface IExpenseItemService
    {
        public void Create(ExpenseItemDto item);

        public List<ExpenseItemDto> GetItems();

        public ExpenseItemDto GetItem(string id);

        public bool DeleteItem(string id);

    }
}
