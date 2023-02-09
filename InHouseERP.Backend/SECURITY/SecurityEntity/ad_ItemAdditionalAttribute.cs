namespace SecurityEntity
{
    public class ad_ItemAdditionalAttribute
    {
        public int ItemAddAttId { get; set; }
        public int ItemId { get; set; }
        public string Barcode { get; set; }
        public bool IsActive { get; set; }
        public string AttributeName { get; set; }
        public int AttributeId { get; set; }
        public string Combination { get; set; }
        public string ItemNameDescription1And2 { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollWeightInKg { get; set; }
    }
}