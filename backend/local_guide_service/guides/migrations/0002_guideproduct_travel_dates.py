from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("guides", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="guideproduct",
            name="travel_start_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="guideproduct",
            name="travel_end_date",
            field=models.DateField(blank=True, null=True),
        ),
    ]