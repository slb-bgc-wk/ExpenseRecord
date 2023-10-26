using ExpenseRecord.Services;
using Microsoft.AspNetCore.Mvc;
using ExpenseRecord.Models;

namespace ExpenseRecord.Controllers;

[ApiController]
[Produces("application/json")]
[Route("api/v1/[controller]")]
public class ExpenseItemsController : ControllerBase
{
    private readonly IExpenseItemService _expenseItemService;

    public ExpenseItemsController(IExpenseItemService expenseItemService)
    {
        _expenseItemService = expenseItemService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ExpenseItemDto>), 200)]
    [ProducesResponseType(500)]
    public ActionResult<List<ExpenseItemDto>> Get()
    {
        var result = _expenseItemService.GetItems();
        return Ok(result);
    }
    /*  public string greet(string name)
      {
          Console.Out.WriteLine(name);
          return "Hello, " + name;
      }*/

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ExpenseItemDto), 200)]
    [ProducesResponseType(404)]
    //[AllowAnonymous]
    public ActionResult<ExpenseItemDto> Get(string id)
    {
        var result =  _expenseItemService.GetItem(id);
        if (result == null)
        {
            return NotFound($"The item with id {id} does not exist.");
        }
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ExpenseItemDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public ActionResult<ExpenseItemDto> Post([FromBody] ExpenseItemCreatRequest requestItem)
    {
        var expenseItemDto = new ExpenseItemDto()
        {
            Discription = requestItem.Discription,
            Type = requestItem.Type,
            Count = requestItem.Count
        };
        _expenseItemService.Create(expenseItemDto);
        return Created("",expenseItemDto);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult Delete(string id)
    {
        var isSuccessful = _expenseItemService.DeleteItem(id);
        if (!isSuccessful)
        {
            return NotFound($"The item with id {id} does not exist.");
        }
        return NoContent();
    }
}